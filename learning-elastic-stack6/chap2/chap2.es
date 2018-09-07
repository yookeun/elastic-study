###
PUT /catalog/product/1
{
    "sku": "SPO00001",
    "title": "Elasticsearch for Hadoop",
    "description": "Elasticsearch for Hadoop",
    "author": "Visual Shukla",
    "ISBN": "1785288997",
    "price": 26.99
}

###
PUT /catalog/product/2
{
    "sku": "SPO00002",
    "title": "Google Pixel Phone 32GB - 5 inch display",
    "description": "Google Pixel Phone 32GB - 5 inch display (Factory Unlocked US Version)",
    "author": "Visual Shukla",    
    "price": 400,
    "resolution": "1440 * 2560 pixels",
    "os": "Android 7.1"
}


GET /catalog/_mapping/product


POST /catalog/product
{
    "sku": "SP000003",
    "title": "Mastering Elasticsearch",
    "description": "Mastering Elasticsearch",
    "author": "Bharvi Dixit",
    "price": 54.99
}

###
GET /catalog/product/_search

###
GET /catalog/product/dtyqRWUB00zKJpGKV4lj


###
POST /catalog/product/1/_update 
{
    "doc": {
        "price": "28.99"
    }
}

###
GET /catalog/product/1


###
POST /catalog/product/3/_update
{
    "doc":{
        "author":"Abert Para",
        "title": "Elasticsearch 5.0 Cookbook",
        "description": "Elasticsearch 5.0 Cookbook Third Edition",
        "price": "54.99"
    },
    "doc_as_upsert": true
}

POST /_analyze
{
    "tokenizer": "standard",
    "text": "Tokenizer breaks characters into tokens!"
}

DELETE index_standard_analyzer

PUT index_standard_analyzer 
{
    "settings": {
        "analysis": {
            "analyzer": {
                "std": {
                    "type": "standard"
                }
            }
        }
    },
    "mappings": {
        "my_type": {
            "properties": {
                "my_text": {
                    "type": "text",
                    "analyzer": "std"
                }
            }
        }
    }
}



POST index_standard_analyzer/_analyze
{
    "field": "my_test",
    "text": "The Standard Analyzer works this way."
}

DELETE index_standard_analyzer_english_stopwords

PUT index_standard_analyzer_english_stopwords
{
    "settings": {
        "analysis": {
            "analyzer": {
                "std": {
                    "type": "standard",
                    "stopwords": "_english_"
                }
            }
        }
    },
    "mappings": {
        "my_type": {
            "properties": {
                "my_text": {
                    "type": "text",
                    "analyzer": "std"
                }
            }
        }
    }    
}

POST index_standard_analyzer_english_stopwords/_analyze
{
    "field": "my_text",
    "text": "The Standard Analyzer works this way."
}

GET /_analyze
{
    "text": "Learning Elastic Stack 6",
    "analyzer": "standard"
}


PUT /custom_analyzer_index
{
    "settings":{
        "index": {
            "analysis": {
                "analyzer":{
                    "custom_analyzer":{
                        "type":"custom",
                        "tokenizer":"standard",
                        "filter":[
                            "lowercase",
                            "custom_edge_ngram"
                        ]
                    }
                },
                "filter": {
                    "custom_edge_ngram":{
                        "type": "edge_ngram",
                        "min_gram":2,
                        "max_gram":10
                    }
                }
            }
        }
    },
    "mappings":{
        "my_type":{
            "properties": {
                "product": {
                    "type": "text",
                    "analyzer": "custom_analyzer",
                    "search_analyzer": "standard"
                }
            }
        }
    }
}

POST /custom_analyzer_index/my_type
{
    "product":"Learning Elastic Stack 6"
}


POST /custom_analyzer_index/my_type
{
    "product":"Mastering Elasticsearch"
}


GET /custom_analyzer_index/_search
{
    "query":{
        "match":{
            "product": true
        }
    }
}



