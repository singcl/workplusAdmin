### server

## 约定

标准返回结果

    {
        status: 0,   // 0代表成功, 1代表失败, 2代表未授权
        msg: '',
        result: {}
    }

服务端地址： http://172.16.1.241:9999


### 模板

#### 创建模板

请求地址: /templates (POST) 

请求参数:

    {
        "name": "请假",
        "intro": "请假模板",
        "icon": "xxx",
        "controls": [],
        "enable": true,
    }


#### 根据ID获取模板详情

请求地址: /templates/:id (GET) 

返回结果：

### 审批

####  发起审批

请求地址: /approvals (POST) 

请求参数:

    {
        "templateId": "57c68c91d2944f1135d83d66",
        "title": "罗敏的请假",
        "approver": [{"userId": "xxx", "name": "xxx", "avatar": "xxx"}],
        "controls": []
    }

####  获取我发起列表
请求地址: /approvals?templateId=xxx&status=MY_LAUNCH (GET)

####  查询我发起列表
请求地址: /approvals?templateId=xxx&status=MY_LAUNCH&query=xxx (GET)

####  获取待审批列表
请求地址: /approvals?templateId=xxx&status=PROCESSING (GET)

####  查询待审批列表
请求地址: /approvals?templateId=xxx&status=PROCESSING&query=xxx (GET)

####  获取已审批列表
请求地址: /approvals?templateId=xxx&status=COMPLETED (GET)

####  查询已审批列表
请求地址: /approvals?templateId=xxx&status=COMPLETED&query=xxx (GET)

####  根据ID获取审批详情
请求地址: /approvals/:id (GET)

返回结果


#### 同意
请求地址: /approvals/:id/agree (POST)

请求参数:

    {
        "opinion": "玩得开心点"
    }


#### 拒绝
请求地址: /approvals/:id/reject (POST)
请求参数:

    {
        "opinion": ""

    }


#### 转交
请求地址: /approvals/:id/forward (POST)
请求参数:

    {
        "opinion": "",
        "recipients": {
            "userId": "xxxxx",
            "name": "xxxxx",
            "avatar": "xxxxx"
        }

    }


#### 撤销
请求地址: /approvals/:id/revoke (GET)

#### 获取待审批的条数
请求地址: /approvals/count?templateId=xxx (GET)

#### 查询所有审批
请求地址: /approvals?page=0&size=10&query=xxx (GET)

### 登陆

#### 用户登录
请求地址: /login (POST)
请求参数:

    {
      "from": "MOBILE",
      "userId": "8e4eca6bb62a4caea183ce66a2768682",
      "name": "罗敏",
      "avatar": "xxxxx",
      "orgId": "108f826f-4a36-4742-a124-6ade824c85ed",
      "ticket": "bebd9c2dc5c943249b7ddc211f7d02d3"
    }


#### 管理员登录
请求地址: /login (POST)
请求参数:

    {
      "from": "PC",
      "userId": "8e4eca6bb62a4caea183ce66a2768682",
      "name": "罗敏",
      "avatar": "xxxxx",
      "orgId": "108f826f-4a36-4742-a124-6ade824c85ed",
      "ticket": "bebd9c2dc5c943249b7ddc211f7d02d3"
    }
