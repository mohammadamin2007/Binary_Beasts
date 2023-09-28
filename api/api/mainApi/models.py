from django.db import models
# Create your models here.


class User(models.Model):
    user_name = models.CharField(default="", max_length=200)
    password = models.CharField(default="", max_length=200)
    email = models.EmailField(default="", unique=True)
    field = models.CharField(default="", max_length=200)
    score = models.IntegerField(default=0)

    def __str__(self):
        return self.user_name


class Comment(models.Model):
    sender = models.ForeignKey(User, on_delete=models.CASCADE)
    body = models.CharField(default="", max_length=200)
    file1 = models.FileField(upload_to="uploads/", null=True)
    file2 = models.FileField(upload_to="uploads/", null=True)

    def __str__(self):
        return f"{self.sender}----->{self.body}"


class Questions(models.Model):
    id = models.IntegerField(primary_key=True)
    sender = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(default="", max_length=200)
    explanation = models.CharField(default="", max_length=200)
    field = models.CharField(default="", max_length=200)
    peopleToShow = models.CharField(default="", max_length=200)
    deadLine = models.CharField(default="", max_length=200)
    comments = models.ManyToManyField(Comment)
    file1 = models.FileField(upload_to="uploads/", null=True)
    file2 = models.FileField(upload_to="uploads/", null=True)
    tags = models.CharField(default="", max_length=400)

    def __str__(self):
        return f"{self.sender}----->{self.title}"
