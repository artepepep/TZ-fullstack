from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import SearchSerializer
from django.core.cache import cache
import requests

CACHE_TTL = 60 * 60 * 2  # 2 hours

class SearchAPIView(APIView):
    def get(self, request):
        serializer = SearchSerializer(data=request.query_params)
        serializer.is_valid(raise_exception=True)

        search_type = serializer.validated_data['type']
        value = serializer.validated_data['value']
        page = serializer.validated_data['page']

        cache_key = f"{search_type}:{value}:page{page}"
        data = cache.get(cache_key)

        if not data:
            url = f"https://api.github.com/search/{search_type}?q={value}&page={page}&per_page=9"
            resp = requests.get(url, headers={'Accept':'application/vnd.github.v3+json'})
            if resp.status_code != 200:
                return Response({'detail':'GitHub API error'}, status=resp.status_code)
            data = resp.json()
            cache.set(cache_key, data, timeout=CACHE_TTL)

        total_count = data.get("total_count", 0)
        has_next = page * 9 < total_count

        return Response({
            "data": data.get("items", []),
            "totalCount": total_count,
            "nextCursor": page + 1 if has_next else None,
        })

class ClearCacheAPIView(APIView):
    def post(self, request):
        cache.clear()
        return Response({'status':'cache cleared'}, status=status.HTTP_200_OK)