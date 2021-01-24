from backend.crawling.parser import Parser 

import pytest


def func(x):
    return x + 1


def test_bad_csv():
    with pytest.raises(Exception) as excinfo:
        Parser("tests/test_data").parse("bad_csv.csv")

