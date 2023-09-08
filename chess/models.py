from django.contrib.auth.models import AbstractUser, User
from django.db import models
from datetime import datetime

# Forum Category
class Category(models.Model):
    title = models.CharField(max_length=64)

    def __str__(self):
        return self.title

# Forum Thread
class Thread(models.Model):
    title = models.CharField(max_length=128)
    description = models.TextField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    post_count = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"'{self.title}' thread created by {self.created_by} at '{self.created_at.strftime('%m/%d/%Y, %H:%M:%S')}'"

    def update_post_count(self):
        self.post_count = Post.objects.filter(thread=self).count()
        self.save()

# Forum Post
class Post(models.Model):
    thread = models.ForeignKey(Thread, on_delete=models.CASCADE)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.created_by.username} posted in '{self.thread.title}' at '{self.created_at.strftime('%m/%d/%Y, %H:%M:%S')}'"
    
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        self.thread.update_post_count()