###
DELETE /amazon_products

###
PUT /amazon_products
{
    "settings":{
        "number_of_shards":1,
        "number_of_replicas":0,
        "analysis":{
            "analyzer":{}
        }
    },
    "mappings":{
        "products":{
            "properties":{
                "id":{
                    "type":"keyword"
                },
                "title": {
                    "type": "keyword"
                },
                "description": {
                    "type": "text"
                },
                "manufacturer":{
                    "type": "text",
                    "fields":{
                        "raw": {
                            "type":"keyword"
                        }
                    }
                },
                "price": {
                    "type": "scaled_float",
                    "scaling_factor":100
                }
            }
        }
    }
}

###
GET /amazon_products

###
GET /amazon_products/_search 
{
    "query":{
        "match_all":{}
    }
}

###
GET /amazon_products/products/_search
{
    "query":{
        "range":{
            "price":{
                "gte":10,
                "lte":20
            }
        }
    }
}

###
GET /amazon_products/products/_search
{
    "from":0,
    "size":10,
    "query":{
        "range":{
            "price":{
                "gte":10,
                "lte":20,
                "boost":2
            }
        }
    }
}

###
GET /amazon_products/products/_search
{
    "query":{
        "exists":{
            "field":"description"
        }
    }
}

###
GET /amazon_products/products/_search
{
    "query":{
        "term":{
            "manufacturer.raw":"boomerang"
        }
    }
}

GET /amazon_products/products/_search
{
    "query":{
        "term":{
            "manufacturer.raw":"victory multimedia"
        }
    }
}


GET /amazon_products/products/_search
{
    "query":{
        "match":{
            "manufacturer":"victory multimedia"
        }
    }
}



GET /amazon_products/products/_search
{
    "query":{
        "term":{
            "manufacturer":"victory multimedia"
        }
    }
}


GET /amazon_products/products/_search
{
    "query":{
        "match":{
            "manufacturer": {
                "query":"victory mulmedia",
                "fuzziness":2

            }
        }
    }
}

GET /amazon_products/properties/_search
{
    "query":{
        "match_phrase":{
            "description":{
                "query":"real video aquarium",
                "slop":1
            }
        }
    }
}


GET /amazon_products/products/_search
{
    "query":{
        "multi_match":{
            "query":"monitor aquarium",
            "fields":[
                "title",
                "description"
            ]
        }
    }
}