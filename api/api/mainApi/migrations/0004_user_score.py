# Generated by Django 4.2.5 on 2023-09-26 18:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mainApi', '0003_user_degree_user_field'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='score',
            field=models.CharField(default='', max_length=200),
        ),
    ]
