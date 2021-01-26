from crawling.parser import Parser

from crawling.github_scraper import enoughDiskSpace
import pytest
import os

from github import Github


def test_good_csv():
    Parser("tests/test_data").parse("dpc-covid19-ita-regioni-20200224.csv")
    # check if the geojson was generated
    assert(os.path.exists(
        "tests/test_data/geojson/dpc-covid19-ita-regioni-20200224.csv.json")) == True
    # delete the file
    os.remove("tests/test_data/geojson/dpc-covid19-ita-regioni-20200224.csv.json")


def test_bad_csv():
    with pytest.raises(Exception):
        Parser("tests/test_data").parse("bad_csv.csv")


# throws an exception otherwise
def test_github_repo():
    g = Github()
    repo = g.get_repo("pcm-dpc/COVID-19")
    repo.get_contents("dati-regioni")


def test_enough_space():
    with pytest.raises(SystemExit):
        enoughDiskSpace(10000000)

def test_enough_space_real_number():
    enoughDiskSpace(500)
