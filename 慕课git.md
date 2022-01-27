# git安装

# 上传代码至github

- 项目文件夹中创建 .gitignore文件

```
//过滤文件，写了的不会被上传，这里忽略两个文件夹
内容：
	.history
	.vscode
```

```
上传代码=》
	git init   //会隐藏被忽略的文件  
	git add . //将文件放到暂存区
	git commit -m  第一次上传文件  //将暂存区代码传到远程仓库
	git remote add origin https:://github.com/LadyChatterleyLover/text-demo.git
	git push -u origin master
```



#### 查找所有的操作记录

```
git status   //查看当前项目做过哪些改动
git log //查看之前的commit提交记录
git log --author='五月的夏天' //查看这个用户的提交记录
```



#### 如何配置用户名和邮箱

```
git config --global user.name '五月的夏天' //配置用户名
git config --global user.email "28282828@qq.com" //配置邮箱
git config --global --list//查看用户名和邮箱
```



#### 想要修改项目中的文件如何操作

```
改动后
git status  //看看有没有打印  modified xxx.xxx  这表示某文件被改动
git add xxx.xxx  //将被改动的文件上传到暂存区
git commit -m 修改文件  //将文件提交
```



#### 想要删除不需要的文件时如何操作

```
手动删除某个文件后：
git status  // 能看到红色的   deleted xxx.xxx
git add .  //将剩余的文件加到暂存区
git commit -m 手动删除文件  //将文件提交


自动删除：
git rm demo3.html
git add .
git commit -m 命令删除文件  //将文件提交
```



#### 想要给文件重命名时如何操作

```
手动更改后：
git status // 红的  deleted 老名字.xxx   add 新名字.xxx 
git add 新名字.xxx 
git rm 老名字.xxx
git commit -m   手动重命名 

命令行更改：
git mv 老名字.xxx 新名字.xxx  
git commit -m   命令行重命名 
```



#### 移动文件到其他位置，如何操作

```
git mv 文件名.xxx  .文件夹名
git commit -m   移动文件


移动并重命名：
git mv 文件名.xxx .文件夹名/新名字.xxx
git commit -m   移动文件并且rename
```



#### 文件有变化时如何查看文件变化

```
git log --pretty=online home/home.html //返回 id (Head -> master) "备注信息"
git show id  //就能查看到具体信息

第二种方法
git log -p home/home.html // 这样直接展示具体信息
```





#### 操作失误的情况下如何一键还原(回到上一次的提交状态)

```
第一种
git diff

第二种
git status
git checkout  -- home/home.html  //将这个文件还原 前提，这次更改还没有上传暂存区
```



#### 不再追踪时如何实现撤销追踪操作

```
git reset HEAD home/home.html //撤销追踪
git checkout  -- home/home.html
```



#### 想要回到项目上一版本，或者指定版本如何操作

```
git reset --hard HEAD^^ // 一个^代表回退一个版本

第二种：
拿到commit id
git reset --hard  “id” 
```

#### 想要文件回到项目上一版本，或者指定版本如何操作

```
先拿到commit id
git checkout commitId -- xxx.xxx
```





#### 想要修改内容之后推送至远程仓库如何进行操作

```
git add .
git commit -m  第一次修改提交到仓库
git push origin master //推送到master分支
```





#### 想要给每个版本创建一个独特标签，做所有标签管理时如何进行操作

```
git tag v1.0 //默认是把标签加到最新提交的版本上
git tag  //v1.0
git tag v0.9 commitId  //加到指定版本

删除标签
git tag -d v0.5

git push origin v1.0 //将标签版本推送到远程仓库
```





#### 想要创建，删除，切换分支时如何操作

```
创建分支
git branch dev  //创建了个 dev分支
git branch  //查看分支

切换分支
git checkout dev  //切换到dev分支


git checkout -b test //退出当前分支切换到了test

删除分支
git branch -d  dev  //无法删除当前正在的分支
git branch -D  dev  //强制删除
```

#### 如何正确合并分支

```
现有分支 master  dev
git checkout master //切换到master分支上
git merge dev  //dev代码现在就已经合并到master上去了
```



#### 当合并分支时有冲突如何正确的合并分支

```
当合并出现冲突时
git fetch  //拉取远端项目
//第一种
git merge --abort //忽略其他分支的内容，保留原分支的内容

//第二种手动
第一步：更改文件中的内容为自己需要的代码
第二步  git add . 
第三步	git commit
第四步   写注释：“这是最终需要的代码”
第五步   :wq退出写注释
六 		git commit -m 解决冲突了
七		git push origin commitId
```

#### 不同人想要查看版本路线改如何操作

```
git log --oueline //查看简写的日志
git log --oueline --graph //查看版本路线
```



#### 不同人想要删除不想要的分支

```
git push origin --delete summer //删除了summer分支
```





#### 不同人修改了不同文件如何处理

```

git branch -av //查看远端仓库
git merge origin/test
git push 
```

​	

