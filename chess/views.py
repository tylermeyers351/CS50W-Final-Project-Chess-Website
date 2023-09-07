from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render, get_object_or_404
from django.urls import reverse
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User

# Create your views here.
def index(request):
    return render(request, "chess/index.html")

@login_required(login_url="login")
def play(request):
    return render(request, "chess/play.html")

@login_required(login_url="login")
def news(request):
    return render(request, "chess/news.html")

@login_required(login_url="login")
def learn(request):
    return render(request, "chess/learn.html")

# Function utilized from CS50w's 'network' assignment.
def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "chess/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "chess/login.html")

# Function utilized from CS50w's 'network' assignment.
def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))

# Function utilized from CS50w's 'network' assignment.
def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "chess/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "chess/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "chess/register.html")
    
def user_list(request):
    return render(request, "chess/users.html")

def forums(request):
    return render(request, "chess/forums.html")