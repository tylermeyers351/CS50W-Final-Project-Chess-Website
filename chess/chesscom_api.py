from chessdotcom import get_leaderboards
import pprint

printer = pprint.PrettyPrinter()

def print_leaderboards():
    data = get_leaderboards()
    printer.pprint(data.json)

print_leaderboards()