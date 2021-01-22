
# Nizar Hmain

'''
//########################################################################################
 the purpose of this parser is to
 convert csv files and append the information to the GeoJson as features
//########################################################################################
 '''

import json
import csv
import collections

# This is used for the provinces that have different names
# Valle d'Aosta/Vallée d'Aoste in json
# Valle d'Aosta d'Aoste in csv

# Friuli-Venezia Giulia in json
# Friuli Venezia Giulia in csv

# We have to sum the numbers for this particular case
# Trentino-Alto Adige/Südtirol in json
# P.A. Bolzano and P.A. Trento in csv


# add a try catch if we can't read from the file

class Parser:

    # costruttore della classe
    def __init__(self, csv_file, geojson_file):

        # User arguments
        self.csv_file = csv_file
        self.geojson_file = geojson_file

        self.json_list = []
        self.csv_name_list = []
        self.merged_values = []
        self.csv_headers = []

########################################################################################

    def handleName(self, name):
        if name == "Valle d'Aosta":
            return "Valle d'Aosta/Vallée d'Aoste"

        if name == "Friuli Venezia Giulia":
            return "Friuli-Venezia Giulia"

        if name == "P.A. Bolzano" or name == "P.A. Trento":
            return "Trentino-Alto Adige/Südtirol"

        return name


########################################################################################


    def getInfoFromCsv(self, row):
        # take the row name
        name = self.handleName(row[3])

        new_obj = {}
        new_obj['alias'] = name

        for i in range(len(self.csv_headers)):
            key = self.csv_headers[i]
            value = row[i]
            new_obj[key] = value

        return new_obj


########################################################################################

    def readingCsv(self):

        try:
            with open(self.csv_file, 'r') as file:

                # skipping the first row, since we don't need it
                reader = csv.reader(file)
                i = 0

                for row in reader:
                    # thats the first line of headers
                    if i == 0:
                        self.csv_headers = row
                        i = i + 1
                    else:

                        # creates the object
                        merged = self.getInfoFromCsv(row)

                        # check if it already exists, only useful for Trentino-Alto Adige/Sudtirol case
                        # add it to the json file

                        self.merged_values.append(merged)
                        # print(merged)
                        i = i + 1

        except FileNotFoundError:
            print(
                f' the file was not found in the path {self.csv_file}, check the path again ')

 ########################################################################################

    def checkIfConvertableFromString(self, value, field):

        # dont convert these numbers, since they are codes not useful to use
        if field == "codice_regione":
            return value
        if field == "lat":
            return value
        if field == "long":
            return value

########################################################################################

        try:
            # if it is convertable then do it
            return float(value)
        except ValueError:
            return value
            # otherwise nothing happens
            # print("Not a float")

    # Changing the json file

## THIS IS THE MAIN FUNCTION, run this to parse

    def parse(self):
        self.readingCsv()
        self.modifyGeojson()


########################################################################################


    def modifyGeojson(self):

        with open(self.geojson_file) as json_file:
            data = json.load(json_file)
            x = 0
            for f in data['features']:
                x = x+1
                # print(x)

                # working with buffered content
                name = f['properties']['reg_name']

                for value in self.merged_values:
                    # remember this is where we set it before
                    if name == value['alias']:
                        for field in value:

                            converted_value = self.checkIfConvertableFromString(
                                value[field], field)

                            # if the type is a float, we are going to try to sum it up, because of trentino's two provinces
                            # we need to add it's data up
                            if name == 'Trentino-Alto Adige/Südtirol':
                                try:

                                    # only sum if it's a number not a string
                                    if (isinstance(f['properties'][field], float)):
                                        f['properties'][field] = f['properties'][field] + \
                                            converted_value
                                        print(field)
                                        print(f['properties'][field])

                                except KeyError:
                                    f['properties'][field] = converted_value
                            else:
                                # it is a string, so we don't sum anything up
                                f['properties'][field] = converted_value

                # Save our changes to JSON file
            jsonFile = open("replayScript.json", "w+")
            jsonFile.write(json.dumps(data))
            jsonFile.close()

        # print(csv_headers)

        # print(json_list)
        # print(csv_name_list)

        # print(merged_values)


p = Parser('./csvsasas/dpc-covid19-ita-regioni-20210119.csv',
           './geojson/regions.json')

p.parse()