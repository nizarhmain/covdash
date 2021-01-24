

from parser import Parser
from github_scraper import scrape
from progress.bar import Bar
import os 

# first download from git
scrape()

# parse all the csvs from git

p = Parser()

csvs = os.listdir("./csv")

bar = Bar('Parsing', max=len(csvs))
for csv in csvs:
   Parser().parse(csv)
   bar.next()

bar.finish()
