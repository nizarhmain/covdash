from crawling.parser import Parser

import pytest

import os


def func(x):
    return x + 1


def test_good_csv():
    Parser("./tests/test_data").parse("dpc-covid19-ita-regioni-20200224.csv")
    # check if the geojson was generated
    assert(os.path.exists("./tests/test_data/geojson/dpc-covid19-ita-regioni-20200224.csv.json")) == True
    # delete the file
    os.remove("./tests/test_data/geojson/dpc-covid19-ita-regioni-20200224.csv.json")



def test_bad_csv():
    with pytest.raises(Exception):
        Parser("tests/test_data").parse("bad_csv.csv")
