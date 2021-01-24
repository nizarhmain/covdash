
# THIS IS THE GITHUB SCRAPER that scrapes the files from
# https://github.com/pcm-dpc/COVID-19


from github import Github

import urllib.request
import ssl
import os
import psutil

from progress.bar import Bar

# otherwise download the file from github creates issues
ssl._create_default_https_context = ssl._create_unverified_context


def enoughDiskSpace(csvs):

    hdd = psutil.disk_usage('/')

    # each csv is approx 2kb in size
    if hdd.free < csvs**3:
        print("not enough space, make some room for the data")
        exit(1)


# check if there is enough space on the disk first


# download file to the csv folder
def download_file(url, filename):
    # print(url)
    # print(filename)

    # check if file already exists
    if (os.path.isfile(f'data/csv/{filename}') == False):
        # print("does not exist yet")
        urllib.request.urlretrieve(url, f'data/csv/{filename}')

    # other wise dont download it


def scrape():
    g = Github()

    repo = g.get_repo("pcm-dpc/COVID-19")
    contents = repo.get_contents("dati-regioni")

    print(f'repository last updated at {repo.updated_at}')

    enoughDiskSpace(len(contents))

    print("there is enough space")
    bar = Bar('Downloading', max=len(contents))

    for content_file in contents:
        # print(content_file.download_url)
        # the size is in kb
        # print(content_file.size)
        bar.next()
        download_file(content_file.download_url, content_file.name)

    bar.finish()

    print(f' ultimo file {contents[-3]}')
