# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2018-08-17 04:04
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0002_auto_20180817_1113'),
    ]

    operations = [
        migrations.AlterField(
            model_name='photos',
            name='photo',
            field=models.ImageField(unique=True, upload_to='photo/%Y/%m/%d/', verbose_name='照片'),
        ),
    ]
