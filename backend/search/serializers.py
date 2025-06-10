from rest_framework import serializers
from enum import Enum

class SearchType(Enum):
    USERS = 'users'
    REPOSITORIES = 'repositories'

class SearchSerializer(serializers.Serializer):
    type = serializers.ChoiceField(
        choices=[(t.value, t.name.title()) for t in SearchType],
        help_text='Type of GitHub search (users or repositories)'
    )
    value = serializers.CharField(min_length=3)
    page = serializers.IntegerField(min_value=1, required=False, default=1)