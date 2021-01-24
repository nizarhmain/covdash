

from crawling.parser import Parser
from crawling.github_scraper import scrape
from progress.bar import Bar
import os 


# check if the data folder exists
# create them if they dont

if (os.path.exists('data/csv') == False or os.path.exists('data/geojson') == False):
   os.mkdir('data')
   os.mkdir('data/csv')
   os.mkdir('data/geojson')


# first download from git
scrape()

# parse all the csvs from git

p = Parser("data")

csvs = os.listdir("data/csv")

bar = Bar('Parsing', max=len(csvs))
for csv in csvs:
   Parser("data").parse(csv)
   bar.next()

bar.finish()
