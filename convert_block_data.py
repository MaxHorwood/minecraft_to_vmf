import json

f = open("block_data.json", "r")

json_data = json.loads(f.read())
f.close()
temp = {}

for jo in json_data:
  if not jo["type"] in temp:
    temp[jo["type"]] = {}
  if not jo["meta"] in temp[jo["type"]]:
    temp[jo["type"]][jo["meta"]] = {"name":jo["name"], "block_type":jo["text_type"]}

print(json.dumps(temp, indent=4, sort_keys=True))  
print(len(temp[14]))

x = open("json_block_data.json", "w")
x.write(json.dumps(temp, indent=4, sort_keys=True))
x.close()
