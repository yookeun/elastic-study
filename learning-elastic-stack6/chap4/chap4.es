###
PUT /bigginsight
{
  "settings": {
    "index": {
      "number_of_replicas": "1",
      "number_of_shards": "5"
    }
  },
  "mappings": {
    "usageReport": {
      "properties": {
        "accessPointId": {
          "type": "keyword",
          "fields": {
            "analyzed": {
              "type": "text"
            }
          }
        },
        "application": {
          "type": "keyword",
          "fields": {
            "analyzed": {
              "type": "text"
            }
          }
        },
        "band": {
          "type": "keyword",
          "fields": {
            "analyzed": {
              "type": "text"
            }
          }
        },
        "bandwidth": {
          "type": "double"
        },
        "category": {
          "type": "keyword",
          "fields": {
            "analyzed": {
              "type": "text"
            }
          }
        },
        "customer": {
          "type": "keyword",
          "fields": {
            "analyzed": {
              "type": "text"
            }
          }
        },
        "department": {
          "type": "keyword",
          "fields": {
            "analyzed": {
              "type": "text"
            }
          }
        },
        "downloadCurrent": {
          "type": "double"
        },
        "downloadTotal": {
          "type": "integer"
        },
        "inactiveMs": {
          "type": "integer"
        },
        "location": {
          "type": "geo_point"
        },
        "mac": {
          "type": "keyword",
          "fields": {
            "analyzed": {
              "type": "text"
            }
          }
        },
        "networkId": {
          "type": "keyword",
          "fields": {
            "analyzed": {
              "type": "text"
            }
          }
        },
        "signalStrength": {
          "type": "integer"
        },
        "time": {
          "type": "date",
          "format": "strict_date_optional_time||epoch_millis"
        },
        "uploadCurrent": {
          "type": "double"
        },
        "uploadTotal": {
          "type": "integer"
        },
        "usage": {
          "type": "double"
        },
        "username": {
          "type": "keyword",
          "fields": {
            "analyzed": {
              "type": "text"
            }
          }
        }
      }
    }
  }
}

GET /bigginsight/usageReport/_search 
{
  "query":{
    "match_all":{}
  }
}


GET /bigginsight/_search
{
  "aggregations":{
    "download_sum":{
      "sum":{
        "field":"downloadTotal"
      }
    }
  },
  "size":0
}

GET /bigginsight/_search?size=0
{
  "aggregations":{
    "download_avg":{
      "avg":{
        "field":"downloadTotal"
      }
    }
  }
}


GET /bigginsight/_search
{
  "aggregations":{
    "download_stats":{
      "stats":{
        "field":"downloadTotal"
      }
    }
  },
  "size":0
}


GET /bigginsight/_search?size=0
{
  "aggregations":{
    "download_estats":{
      "extended_stats":{
        "field":"downloadTotal"
      }
    }
  }
}


GET /bigginsight/_search
{
  "aggs":{
    "unique_visitors":{
      "cardinality":{
        "field":"username"
      }
    }
  },
  "size":0
}


GET /bigginsight/_search
{
  "aggs":{
    "byCategory":{
      "terms":{
        "field":"category"
      }
    }
  },
  "size":0
}


GET /bigginsight/_search?size=0
{
  "aggs":{
    "byApplicatins":{
      "terms":{
        "field":"application",
        "size":20
      }
    }
  }
}

GET /bigginsight/_search?size=0
{
  "aggs":{
    "by_usage":{
      "histogram":{
        "field":"usage",
        "interval": 1000
      }
    }
  }
}


GET /bigginsight/_search?size=0
{
  "aggs":{
    "by_usage":{
      "range":{
        "field":"usage",
        "ranges":[
          {"to":1024},
          {"from":1024,"to":102400},
          {"from": 12400}
        ]
      }
    }
  }
}

GET /bigginsight/usageReport/_search?size=0
{
  "query":{
    "term":{
      "customer":"Linkedin"
    }
  },
  "aggs":{
    "byCategory":{
      "terms":{
        "field":"category"
      }
    }
  }
}


GET /bigginsight/usageReport/_search
{
  "query":{
    "term":{
      "customer":"Linkedin"
    }
  }
}

GET /bigginsight/usageReport/_search
{
  "query":{
    "match":{
      "customer":{
        "query":"Linkedin"
      }
    }
  }
}


GET /bigginsight/usageReport/_search?size=0
{
  "query":{
    "bool":{
      "must":[
        {"term":{"customer":"Linkeid"}},
        {"range":{"time":{"gte": 1562277800000, "lte":1506294200000}}}
      ]
    }
  },
    "aggs":{
      "byCategory":{
        "terms":{
          "field":"category"
        }
      }
    }  
}

GET /bigginsight/usageReport/_search?size=0
{
  "query":{
    "bool":{
      "must":[
        {"term": {"customer": "Linkedin"}},
        {"range": {"time": {"gte": 1506257800000, "lte":1506314200000}}}
      ]
    }
  },
  "aggs":{
    "by_users":{
      "terms":{
        "field":"username"
      },
      "aggs":{
        "total_usage":{
          "sum":{
            "field":"usage"
          }
        }
      }
    }
  }
}


GET /bigginsight/usageReport/_search?size=0
{
  "query":{
    "bool":{
      "must":[
        {"term": {"customer":"Linkedin"}},
        {"range": {"time":{"gte": 1506257800000, "lte":1506314200000}}}
      ]
    }
  },
  "aggs":{
    "by_departments":{
      "terms":{"field": "username"},
      "aggs":{
        "by_users":{
          "terms":{
            "field":"username",
            "size":2,
            "order": {"total_usage":"desc"}
          },
          "aggs":{
            "total_usage":{"sum":{"field":"usage"}}
          }
        }
      }
    }
  }
}


POST /bigginsight/_search?size=0
{
  "aggs":{
    "chat":{
      "filter":{
        "term":{
          "category":"Chat"
        }
      }
    }
  }
}

GET /bigginsight/

GET /bigginsight/_search?size=0
{
  "aggs":{
    "messages":{
      "filters":{
        "filters":{
          "chat":{"match": {"category": "Chat"}},
          "skype": {"match": {"application": "Skype"}},
          "other_than_skype":{
            "bool":{
              "must": {"match": {"category": "Chat"}},
              "must_not": {"match": {"application": "Skype"}}
            }
          }
        }
      }
    }
  }
}

GET /bigginsight/usageReport/_search?size=0
{
  "aggs":{
    "counts_over_time":{
      "date_histogram":{
        "field":"time",
        "interval":"1d"
      }
    }
  }
}


GET /bigginsight/usageReport/_search?size=0
{
  "aggs":{
    "counts_over_time":{
      "date_histogram":{
        "field":"time",
        "interval":"1d",
        "time_zone":"+09:00"
      }
    }
  }
}



GET /bigginsight/usageReport/_search?size=0
{
  "query":{
    "term":{
      "customer": "Linkedin"
    }
  },
  "aggs":{
    "counts_over_time":{
      "date_histogram":{
        "field":"time",
        "interval":"1d",
        "time_zone":"+09:00"
      },
      "aggs":{
        "total_bandwidth":{
          "sum": {
            "field":"usage"
          }
        }
      }
    }
  }
}

GET /bigginsight/usageReport/_search?size=0
{
  "query":{
    "bool":{
      "must":[
        {"term": {"customer": "Linkedin"}},
        {"range":{"time":{"gte":"2017-09-25"}}}
      ]
    }
  },
  "aggs":{
    "counts_over_time":{
      "date_histogram":{
        "field":"time",
        "interval":"1h",
        "time_zone":"+05:30"
      },
      "aggs":{
        "hourly_usage":{
          "sum":{"field":"usage"}
        }
      }
    }
  }
}

GET /bigginsight/usageReport/_search?size=0
{
  "aggs":{
    "within_radius":{
      "geo_distance":{
        "field":"location",
        "origin": {"lat":23.202869, "lon": 72.595692},
        "ranges": [{"to":5}]
      }
    }
  }
}

GET /bigginsight/usageReport/_search?size=0
{
  "aggs":{
    "within_radius":{
      "geo_distance":{
        "field":"location",
        "origin": {"lat":23.102869, "lon": 72.595692},
        "ranges":[{"from":5, "to":10}]
      }
    }
  }
}

GET /bigginsight/usageReport/_search?size=0
{
  "aggs":{
    "geo_hash":{
      "geohash_grid":{
        "field":"location",
        "precision":7
      }
    }
  }
}



GET /bigginsight/usageReport/_search?size=0
{
  "query":{
    "bool":{
      "must":[
        {"term": {"customer": "Linkedin"}},
        {"range":{"time":{"gte":"2017-09-25"}}}
      ]
    }
  },
   "aggs":{
      "count_over_time":{
        "date_histogram":{
          "field":"time",
          "interval":"1h",
          "time_zone":"+05:30"
        },
        "aggs":{
          "hourly_usage": {
            "sum":{"field": "usage"}
          },
          "cumulative_houlry_usage":{
            "cumulative_sum":{
              "buckets_path":"hourly_usage"
            }
          }
        }
      }
    }  
}