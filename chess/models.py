from django.contrib.auth.models import AbstractUser, User
from django.db import models
from datetime import datetime

# The inital forum discussion posted.
class Forum(models.Model):
    title = models.CharField(max_length=280)
    description = models.CharField(max_length=280)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="forum_author")
    timestamp = models.DateTimeField(auto_now_add=True)
    vote_count = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"Post: #{self.id} - Author: {self.author} - Time: {self.timestamp.strftime('%m/%d/%Y, %H:%M:%S')}"

# The replies to the forum.
class Reply(models.Model):
    description = models.CharField(max_length=280)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="reply_author")
    timestamp = models.DateTimeField(auto_now_add=True)
    vote_count = models.PositiveIntegerField(default=0)


    def __str__(self):
        return f"Post: #{self.id} - Author: {self.author} - Time: {self.timestamp.strftime('%m/%d/%Y, %H:%M:%S')}"