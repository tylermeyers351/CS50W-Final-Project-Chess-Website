from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),

    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),

    path("play", views.play, name="play"),
    path("news", views.news, name="news"),
    path("learn", views.learn, name="learn"),
    path("forums", views.forums, name="forums"),
    path("forums/<int:id>", views.forum_thread, name="forum_thread"),
    
    path("leaderboards", views.leaderboards, name="leaderboards"),

]