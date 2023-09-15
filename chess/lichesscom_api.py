import requests
from pprint import pprint

def get_streamers():
    response = requests.get("https://lichess.org/api/streamer/live")
    data = response.json()

    top_players = data[:5]

    pprint(top_players)

def get_bullet(player_num):
    response = requests.get(f"https://lichess.org/api/player/top/{player_num}/bullet")

def get_rapid(player_num):
    response = requests.get(f"https://lichess.org/api/player/top/{player_num}/rapid")

# Let's get the title, username, and the elo.
def get_blitz(player_num):
    response = requests.get(f"https://lichess.org/api/player/top/{player_num}/blitz")
    data = response.json()

    player_list = []

    for user in data['users']:
        player_data = {
            'username': user['username'],
            'elo': user['perfs']['blitz']['rating']
        }
        player_list.append(player_data)

    return player_list




# get_streamers()
# get_bullet()
# get_rapid()
# print(get_blitz(5))
