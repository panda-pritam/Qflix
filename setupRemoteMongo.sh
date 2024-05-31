
# Setup file template to upload data to MongoDB Atlas

# Setup file template to upload data to MongoDB Atlas

# mongoimport --uri "mongodb://ac-bcebriq-shard-00-00.lxbikvu.mongodb.net:27017,ac-bcebriq-shard-00-01.lxbikvu.mongodb.net:27017,ac-bcebriq-shard-00-02.lxbikvu.mongodb.net:27017/qkart?replicaSet=atlas-s2ww0h-shard-0" --ssl --authenticationDatabase admin --username pritam14 --password pritam14 --drop --collection users --file data/export_qkart_users.json
mongoimport --uri mongodb://ac-39a2rdi-shard-00-00.7nlekm0.mongodb.net:27017,ac-39a2rdi-shard-00-01.7nlekm0.mongodb.net:27017,ac-39a2rdi-shard-00-02.7nlekm0.mongodb.net:27017/xflix?replicaSet=atlas-f5661u-shard-0 --ssl --authenticationDatabase admin --username pritam14 --password pritam14 --drop --collection videos --file data/export_xflix_data.json


#mongo "mongodb://ac-39a2rdi-shard-00-00.7nlekm0.mongodb.net:27017,ac-39a2rdi-shard-00-01.7nlekm0.mongodb.net:27017,ac-39a2rdi-shard-00-02.7nlekm0.mongodb.net:27017/xflix?replicaSet=atlas-f5661u-shard-0" --ssl --authenticationDatabase admin --username pritam14 --password pritam14