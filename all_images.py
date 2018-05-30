from os import listdir


x=open("block_file_name.txt", "w")
x.write("\n".join(str(t) for t in listdir("blocks")))
