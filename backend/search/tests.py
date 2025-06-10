from django.urls import reverse
from rest_framework.test import APITestCase

class SearchAPITest(APITestCase):
    def test_search_requires_fields(self):
        url = reverse('search')
        resp = self.client.post(url, {})
        self.assertEqual(resp.status_code, 400)