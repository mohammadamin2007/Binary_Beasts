# Generated by Django 4.2.5 on 2023-09-27 13:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mainApi', '0007_comment_questions'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='questions',
            name='comments',
        ),
        migrations.AddField(
            model_name='questions',
            name='comments',
            field=models.ManyToManyField(to='mainApi.comment'),
        ),
    ]