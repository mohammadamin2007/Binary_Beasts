# Generated by Django 4.2.5 on 2023-09-28 17:22

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('mainApi', '0012_comment_file1_comment_file2'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='degree',
        ),
    ]
