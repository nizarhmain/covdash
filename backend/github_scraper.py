
# THIS IS THE GITHUB SCRAPER that scrapes the files from
# https://github.com/pcm-dpc/COVID-19


from github import Github

import urllib.request
import ssl
import os
import psutil


ssl._create_default_https_context = ssl._create_unverified_context


def checkDiskSpace():
    hdd = psutil.disk_usage('/')
    return hdd.free


# check if there is enough space on the disk first
checkDiskSpace()


# download file to the csv folder
def download_file(url, filename):
    print(url)
    print(filename)

    # check if file already exists
    if (os.path.isfile(f'csv/{filename}') == False):
        print("does not exist yet")
        urllib.request.urlretrieve(url, f'csv/{filename}')
    else:
        print("dont download it")


g = Github()

repo = g.get_repo("pcm-dpc/COVID-19")
contents = repo.get_contents("dati-regioni")

# each csv is approx 2kb in size
print(len(contents))

if (checkDiskSpace() > len(contents)**3):
    print("there is enough space")

    for content_file in contents:
        # print(content_file.download_url)
        # the size is in kb
        # print(content_file.size)
        download_file(content_file.download_url, content_file.name)

else:
    # exit the program here
    print("there is not enough space")
