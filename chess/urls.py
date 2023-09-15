from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),

    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),

    path("play", views.play, name="play"),
    path("news", views.news, name="news"),
    
    path("forums", views.forums, name="forums"),
    path("forums/<int:id>", views.forum_thread, name="forum_thread"),
    path("new_thread", views.new_thread, name="new_thread"),
    path("new_post/<int:id>", views.new_post, name="new_post"),
    
    path("delete_thread/<int:id>", views.delete_thread, name="delete_thread"),
    path("delete_post/<int:id>", views.delete_post, name="delete_post"),
    
    path("leaderboards", views.leaderboards, name="leaderboards")
]