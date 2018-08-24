import random
import string
import os


os.remove("user.txt") 
num = 1
funcName = ""
txt = ""
while num < 100:
    username = ''.join(random.sample(['0','1','2','3','4','5','6','7','8','9','z','y','x','w','v','u','t','s','r','q','p','o','n','m','l','k','j','i','h','g','f','e','d','c','b','a'],5))
    username2 = ''.join(random.sample(['z','y','x','w','v','u','t','s','r','q','p','o','n','m','l','k','j','i','h','g','f','e','d','c','b','a'],5))
    password = random.randint(10000,99999)
    funcName = str(username2)
    txt += str(username)
    num +=1
ff = funcName+":function(){\n"+"var "+funcName +'="'
txt = ff+txt+'"\n'+"mg2048."+ funcName+"="+ funcName+";\n},"

with open("user.txt","a") as f:
    f.write(txt)
print(num)
