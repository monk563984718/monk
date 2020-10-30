<template>
  <div class="form" style="position:relative;">
    <div class="step-title">第一步：填写商品信息</div>
    <div v-for="item in addShop">
      <el-divider v-if="item!==1">附加商品{{ item-1 }}</el-divider>
      <el-row v-if="item!==1">
        <i style="color: #20a0ff;float: right" class="el-icon-delete" @click="delStore(item)" />
      </el-row>
      <el-row v-if="item!==1">
        <i style="color: #20a0ff;float: right" class="el-icon-delete" @click="delStore(item)" />
      </el-row>
      <div class="form-item">
        <span class="form-required">*必填</span>
        <span class="form-label">商品标题：</span>
        <el-input
          v-model="form.taskGoodsList[item-1].name"
          class="w400"
          size="small"
          placeholder="请输入正确的商品全标题"
        />
        <div class="form-err form-err-change">（仅用于平台审核，用户不可见）</div>
      </div>
      <div class="form-item">
        <span class="form-required">*必填</span>
        <span class="form-label">商品链接：</span>
        <el-input
          v-model="form.taskGoodsList[item-1].url"
          class="w400"
          size="small"
          placeholder="请输入正确的商品网页端网址"
          @blur="inputBlur"
        />
        <div class="form-err form-err-change">（仅用于平台审核，用户不可见）</div>
      </div>
      <div class="form-item" style="position: relative">
        <span class="form-required">*必填</span>
        <span class="form-label">商品主图：</span>
        <div style="position: relative; width:100px;height:100px;border:1px solid #dcdfe6;">
          <label :for="uploads[item-1].id">
            <img v-if="form.taskGoodsList[item-1].img" :src="form.taskGoodsList[item-1].img" :alt="item" style="width:100px;height:100px;">
            <i v-if="!form.taskGoodsList[item-1].img" for="uploads" class="el-icon-plus avatar-uploader-icon" style="display:absolute;top:0x;left:0;" />
          </label>
          <input
            :id="uploads[item-1].id"
            type="file"
            hidden
            accept="image/png, image/jpeg, image/gif, image/jpg"
            @change="uploadImg($event, 1, item)"
          >
          <i class="el-icon-circle-close avatar-uploader-remove" @click="removeMainImg(item)" />
        </div>
        <el-popover
          placement="top"
          width="200"
          trigger="hover"
        >
          <img
            style="width: 175px; height: 200px"
            :src="require('@/assets/images/shilizhutu.png')"
            fit="fill"
          >
          <el-button slot="reference" type="text" class="epshow">查看示例图</el-button>
        </el-popover>

        <div style="position: relative;width: 480px;">
          <div class="upload-d">上传“商品主图”，确保与搜索页面展示的图片一致。</div>
          <div class="form-err upload-e">(如上传不成功请使用谷歌浏览器)</div>
        </div>
      </div>
      <div class="form-item" style="margin-top: 35px">
        <span class="form-required">*必填</span>
        <span class="form-label">搜索展示价：</span>
        <el-input v-model="form.taskGoodsList[item-1].showPrice" size="mini" type="number" style="width: 140px">
          <template slot="append">元</template>
        </el-input>
        <!-- <span class="form-label form-label-price">实际成交价：</span>
        <el-input v-model="form.taskGoodsList[item-1].realPrice" size="mini" type="number" :min="0"
                  style="width: 140px">
          <template slot="append">元</template> -->
        </el-input>
        <span class="form-label form-label-price">付款人数：</span>
        <el-input
          v-model="form.taskGoodsList[item-1].payPeopleNum"
          size="mini"
          type="number"
          :min="0"
          style="width: 140px"
        >
          <template slot="append">人</template>
        </el-input>

      </div>
    </div>

    <div class="step-title">第二步：填写搜索信息</div>
    <div class="form-item">
      <span class="form-required">*必填</span>
      <span class="form-label">选择排序方式：</span>
      <div class="form-block radio-list">
        <el-radio-group
          v-model="form.searchSortWay "
          class="item"
          style="margin-left: 14px;padding-top: 10px;"
          fill="red"
          text-color="#6666FF"
        >
          <el-radio v-for="item in sortList" :label="item.name">{{ item.name }}</el-radio>
        </el-radio-group>
      </div>
    </div>

    <div class="form-item">
      <span class="form-required" />
      <span class="form-label">商品所在地：</span>
      <div class="pr">
        <v-distpicker hide-area :province="province" :city="city" @province="onChangeProvince" @city="onChangeCity" />
      </div>
      <!--<el-input v-model="form.searchLocation" size="small" style="width: 130px;margin-right: 10px"-->
      <!--placeholder="全国">-->
      <!--<template slot="append">省</template>-->
      <!--</el-input>-->
      <!--<el-input v-model="form.searchLocation" size="small" style="width: 130px">-->
      <!--<template slot="append">市</template>-->
      <!--</el-input>-->

      <span class="form-required" />
      <span class="form-label">筛选价格区间：</span>
      <el-input v-model="form.searchMinPrice" size="mini" :min="0" :max="form.searchMaxPrice" type="number" style="width: 130px">
        <template slot="append">元</template>
      </el-input>
      <span style="color:#6666FF;width: 20px;font-size: 12px;text-align: center;">一</span>
      <el-input v-model="form.searchMaxPrice" size="mini" :min="form.searchMinPrice" type="number" style="width: 130px">
        <template slot="append">元</template>
      </el-input>
    </div>

    <div class="form-item">
      <span class="form-required">*必填</span>
      <span class="form-label">选择搜索方式：</span>
      <div class="form-block radio-list">
        <el-radio-group
          v-model="form.searchType"
          class="item"
          style="padding-top: 10px;"
          fill="red"
          text-color="#6666FF"
          @change="handleDearchType"
        >
          <el-radio :label="1">关键词</el-radio>
          <el-radio :label="2">淘口令</el-radio>
          <el-radio :label="3">二维码</el-radio>
        </el-radio-group>
      </div>
    </div>

    <div v-for="item in addKeyWord" v-if="form.searchType===1" class="form-item">
      <span class="form-required">*必填</span>
      <span class="form-label">搜索关键词{{ item }}：</span>
      <el-input v-model="form.taskCommentList[item-1].keyword" size="small" style="width: 350px" />
      <span style="color: #97A8BE;width: 50px;text-align: center">添加</span>
      <el-input-number v-model="order1[item-1]" size="mini" :min="1" style="width: 140px" />
      <span class="form-label" style="margin-left: 10px">单<i
        style="color: #20a0ff;margin-left: 1rem"
        class="el-icon-delete"
        @click="delGuanjc(item)"
      /></span>
    </div>
    <div v-if="form.searchType===1" class="form-item" style="margin-top: 0">
      <span class="form-required" />
      <el-button type="text" @click="handleGuanjc">+增加关键词</el-button>
      <span style="font-size: 12px;color:#bcbcbc;padding: 12px 0 ">（最多可添加10个关键词）</span>
    </div>

    <div v-for="item in addtkl" v-if="form.searchType===2" class="form-item">
      <span class="form-required">*必填</span>
      <span class="form-label">搜索淘口令{{ item }}：</span>
      <el-input v-model="form.taskCommentList[item-1].keyword" size="small" style="width: 350px" />
      <span style="color: #97A8BE;width: 50px;text-align: center">添加</span>
      <el-input-number v-model="order2[item-1]" size="mini" :min="1" style="width: 140px" />
      <span class="form-label" style="margin-left: 10px">单<i
        style="color: #20a0ff;margin-left: 1rem"
        class="el-icon-delete"
        @click="delkl(item)"
      /></span>
    </div>
    <div v-if="form.searchType===2" class="form-item" style="margin-top: 0">
      <span class="form-required" />
      <el-button type="text" @click="handletkl">+增加淘口令</el-button>
      <span style="font-size: 12px;color:#bcbcbc;padding: 12px 0 ">（最多可添加10个淘口令）</span>
    </div>

    <div v-for="item in addewm" v-if="form.searchType===3" class="form-item" style="position: relative">
      <span class="form-required">*必填</span>
      <span class="form-label">搜索二维码{{ item }}：</span>
      <el-upload
        style="background-color: #F2F2F2"
        class="avatar-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
        :before-upload="function(file) {
          return uploadImageEwmChange(item-1)
        }"
        :http-request="uploadImageEwm"
        :show-file-list="false"
      >
        <img
          v-if="form.taskCommentList[item-1].qrCodeImgUrl"
          :src="form.taskCommentList[item-1].qrCodeImgUrl"
          class="avatar"
        >
        <i v-else class="el-icon-plus avatar-uploader-icon" />
      </el-upload>
      <span style="color: #97A8BE;width: 50px;text-align: center">添加</span>
      <el-input-number v-model="order3[item-1]" size="mini" :min="1" style="width: 140px" />
      <span class="form-label" style="margin-left: 10px">单<i
        style="color: #20a0ff;margin-left: 1rem"
        class="el-icon-delete"
        @click="delewm(item)"
      /></span>
    </div>
    <div v-if="form.searchType===3" class="form-item" style="margin-top: 0">
      <span class="form-required" />
      <el-button type="text" @click="handleewm">+增加二维码</el-button>
      <span style="font-size: 12px;color:#bcbcbc;padding: 12px 0 ">（最多可添加10个二维码）</span>
    </div>
    <div class="form-item" style="margin:0;padding:0;">
      <span style="width:600px;" />
      <span style="color: #97A8BE;width: 100px;text-align: center">总共添加</span>
      <!-- <el-input v-model="orderAll" size="mini" :min="1" style="width: 100px;text-align: center" /> -->
      <span>{{ inputAll }}</span>
    </div>

    <div class="form-item">
      <span style="width:600px;" />
      <span style="color: #97A8BE;width: 70px;text-align: center;font-size: 14px;display:inline-block;">共放出</span>
      <span v-text="orderAll" />
      <span class="form-label" style="margin-left: 20px">单</span>
    </div>

    <div v-for="item in orderout" class="form-item">
      <span class="form-label" style="margin:0 5px 0 45px;">
        任务发布时间
      </span>
      <el-date-picker
        v-model="taskReleaseTimeList[item-1].releaseTime"
        type="datetime"
        :picker-options="pickerOptions"
        :placeholder="nowDateTime"
        value-format="yyyy-MM-dd HH:mm:ss"
        size="mini"
      />
      <div class="form-label" style="width:250px;">
        每隔
        <el-input v-model="taskReleaseTimeList[item-1].intervalTime" size="mini" style="width: 140px" type="number">
          <template slot="append">分钟</template>
        </el-input>
        放出1单
      </div>
      <div class="form-label">
        <span style="color: #97A8BE;width: 100px;text-align: center">共放</span>
        <el-input
          v-model="taskReleaseTimeList[item-1].orderNum"
          size="mini"
          style="width: 60px;text-aline: center;"
          type="number"
          @change="changeValue()"
        />
      </div>
      <span class="form-label">单<i
        style="color: #20a0ff;margin-left: 1rem"
        class="el-icon-delete"
        @click="deleout(item)"
      /></span>
    </div>

    <div class="form-item" style="margin-top: 0">
      <span class="form-required" />
      <el-button type="text" @click="handleout">+添加放单计划</el-button>
      <!-- <span style="font-size: 12px;color:#bcbcbc;padding: 12px 0 ">（最多可添加10个二维码）</span> -->
    </div>

    <div class="step-title">第三步：筛选用户截图</div>

    <div v-for="imgItem in imgList" class="form-item">
      <span class="form-required" />
      <span class="form-label">{{ imgItem.name }}：</span>
      <el-checkbox-group
        v-if="imgItem.name === '搜索货比'"
        v-model="screenshotDetails"
        style="display: flex;"
        @change="handleCheckBox"
      >
        <div
          v-for="childImgItem in imgItem.taskScreenshotCategoryDetailList"
          class="checkbox-mr"
          style="width: 135px"
        >
          <el-checkbox :label="childImgItem.id">
            <!--<el-button size="mini" class="checkbox-button-width">{{ childImgItem.name}}</el-button>-->
            <div
              class="checkbox-button-width"
              style="border: 1px solid #DCDFE6;padding: 5px 7px;width: 105px;height:28px;text-align: center"
            >
              {{ childImgItem.name }}
            </div>
          </el-checkbox>

          <span v-if="childImgItem.amount>0" class="checkbox-tip">+{{ childImgItem.amount }}金币/单</span>
        </div>
      </el-checkbox-group>
      <el-checkbox-group v-else v-model="form.screenshotDetailIds" style="display: flex;">
        <div
          v-for="childImgItem in imgItem.taskScreenshotCategoryDetailList"
          class="checkbox-mr"
          style="width: 135px"
        >
          <el-checkbox :label="childImgItem.id">
            <!--<el-button size="mini" class="checkbox-button-width">{{ childImgItem.name}}</el-button>-->
            <div
              class="checkbox-button-width"
              style="border: 1px solid #DCDFE6;padding: 5px 7px;width: 105px;height:28px;text-align: center"
            >
              {{ childImgItem.name }}
            </div>
          </el-checkbox>

          <span v-if="childImgItem.amount>0" class="checkbox-tip">+{{ childImgItem.amount }}金币/单</span>
        </div>
      </el-checkbox-group>

    </div>

    <div class="step-title">第四步：选择增值服务</div>
    <div class="form-item">
      <span class="form-required" />
      <span class="form-label">常规服务</span>
      <el-checkbox v-model="form.taskAdditionalIncrement.toUp" :true-label="1" :false-label="2">任务置顶
      </el-checkbox>
      <span style="font-size: 12px;color:#bcbcbc;">（优先派单）</span>
      <span style="font-size: 12px;color:red; ">+{{ cost.taskToUpAmount }}元/任务</span>
    </div>
    <div class="form-item">
      <span class="form-required" />
      <span class="form-label" />
      <span style="color: #97A8BE;margin-right: 10px">每单加赏</span>
      <el-input-number v-model="form.taskAdditionalIncrement.rewardAmount" size="mini" :min="0" style="width: 100px" />
      <span class="form-label" style="margin-left: 10px">金</span>
      <span style="font-size: 12px;color:#bcbcbc;margin-left: 10px"> (加赏佣金能调动用户的接单积极性)</span>
    </div>
    <div class="form-item">
      <span class="form-required" />
      <span class="form-label">千人千面</span>
      <span style="color: #97A8BE;margin-right: 10px">性别：</span>
      <el-radio-group
        v-model="form.taskAdditionalIncrement.sex"
        class="item"
        style="margin-left: 14px;"
        fill="red"
        text-color="#6666FF"
      >
        <el-radio :label="1" style="color: #97A8BE" @click.native.prevent="clickItem(1)">男</el-radio>
        <el-radio :label="2" style="color: #97A8BE" @click.native.prevent="clickItem(2)">女</el-radio>
        <el-radio style="color: #97A8BE">不选</el-radio>
      </el-radio-group>
      <span style="font-size: 12px;color:#bcbcbc;">（仅限选择性别的用户可接该任务）</span>
      <span style="font-size: 12px;color:red; ">+{{ cost.sexAmount }}金/单</span>
    </div>
    <div class="form-item">
      <span class="form-required" />
      <span class="form-label" />
      <span style="color: #97A8BE;margin-right: 10px">年龄：</span>
      <el-radio-group v-model="age" class="item" style="margin-left: 14px;">
        <el-radio label="18-25" style="color: #97A8BE" @click.native.prevent="clickItemAge('18-25')">18-25</el-radio>
        <el-radio label="26-35" style="color: #97A8BE" @click.native.prevent="clickItemAge('26-35')">26-35</el-radio>
        <el-radio label="35-99" style="color: #97A8BE" @click.native.prevent="clickItemAge('35-99')">35岁以上</el-radio>
        <el-radio label="0-100" style="color: #97A8BE">不选</el-radio>
      </el-radio-group>
      <span style="font-size: 12px;color:#bcbcbc;">（仅限选择年龄的用户可接该任务）</span>
      <span style="font-size: 12px;color:red; ">+{{ cost.ageAmount }}金/单</span>
    </div>
    <div class="form-item">
      <span class="form-required" />
      <span class="form-label" />
      <span style="color: #97A8BE;margin-right: 10px">地区：</span>
      <span style="font-size: 12px;color:#bcbcbc;"> (勾选区域代表不能接单的区域，例如不需要新疆买家，就勾选新疆)</span>
      <span style="font-size: 12px;color:red; ">+{{ cost.areaAmount }}金/单</span>
    </div>
    <div class="form-item">
      <span class="form-required" />
      <span class="form-label" />
      <div class="checkbox-list">
        <el-checkbox-group v-model="form.taskAdditionalIncrement.area">
          <div>
            <el-checkbox label="上海">上海</el-checkbox>
            <el-checkbox label="江苏">江苏</el-checkbox>
            <el-checkbox label="浙江">浙江</el-checkbox>
            <el-checkbox label="安徽">安徽</el-checkbox>
            <el-checkbox label="江西">江西</el-checkbox>
          </div>
          <div>
            <el-checkbox label="北京">北京</el-checkbox>
            <el-checkbox label="天津">天津</el-checkbox>
            <el-checkbox label="山西">山西</el-checkbox>
            <el-checkbox label="山东">山东</el-checkbox>
            <el-checkbox label="河北">河北</el-checkbox>
            <el-checkbox label="内蒙古">内蒙古</el-checkbox>
          </div>
          <div>
            <el-checkbox label="湖南">湖南</el-checkbox>
            <el-checkbox label="湖北">湖北</el-checkbox>
            <el-checkbox label="河南">河南</el-checkbox>
          </div>
          <div>
            <el-checkbox label="广东">广东</el-checkbox>
            <el-checkbox label="广西">广西</el-checkbox>
            <el-checkbox label="福建">福建</el-checkbox>
            <el-checkbox label="海南">海南</el-checkbox>
          </div>
          <div>
            <el-checkbox label="辽宁">辽宁</el-checkbox>
            <el-checkbox label="吉林">吉林</el-checkbox>
            <el-checkbox label="黑龙江">黑龙江</el-checkbox>
          </div>
          <div>
            <el-checkbox label="陕西">陕西</el-checkbox>
            <el-checkbox label="新疆">新疆</el-checkbox>
            <el-checkbox label="甘肃">甘肃</el-checkbox>
            <el-checkbox label="宁夏">宁夏</el-checkbox>
            <el-checkbox label="青海">青海</el-checkbox>

          </div>
          <div>
            <el-checkbox label="重庆">重庆</el-checkbox>
            <el-checkbox label="云南">云南</el-checkbox>
            <el-checkbox label="贵州">贵州</el-checkbox>
            <el-checkbox label="西藏">西藏</el-checkbox>
            <el-checkbox label="四川">四川</el-checkbox>

          </div>
        </el-checkbox-group>
      </div>
    </div>
    <div class="form-item">
      <span class="form-required" />
      <span class="form-label" />
      <span style="color: #97A8BE;margin-right: 10px">类目：</span>
      <span style="font-size: 12px;color:#bcbcbc;">  (勾选类目代表可以接单的类目)</span>
      <span style="font-size: 12px;color:red; ">+{{ cost.huabeiAmount }}金/单</span>
    </div>
    <div class="form-item">
      <span class="form-required" />
      <span class="form-label" />
      <el-checkbox-group v-model="form.taskAdditionalIncrement.goodsCategory">
        <div style="width: 550px;">
          <el-checkbox v-for="item in goodsCategoryList" :label="item.id">{{ item.name }}</el-checkbox>
        </div>
      </el-checkbox-group>
    </div>
    <div class="form-item">
      <span class="form-required" />
      <span class="form-label" />
      <span style="margin-right: 10px">
        <el-checkbox
          v-model="form.taskAdditionalIncrement.huaBei"
          :true-label="1"
          :false-label="2"
          style="color: #97A8BE"
        >仅花呗号可接任务接单</el-checkbox>
      </span>
      <span style="font-size: 12px;color:red; ">+{{ cost.huabeiAmount }}金/单</span>
    </div>
    <div class="form-item">
      <span class="form-required" />
      <span class="form-label" />
      <span style="margin-right: 10px">
        <el-checkbox
          v-model="form.taskAdditionalIncrement.zuanHao"
          :true-label="1"
          :false-label="2"
          style="color: #97A8BE"
        >仅钻号可接任务接单</el-checkbox>
      </span>
      <span style="font-size: 12px;color:red; ">+{{ cost.zuanhaoAmount }}金/单</span>
    </div>
    <!-- <div class="form-item">
      <span class="form-required" />
      <span class="form-label" />
      <span style="margin-right: 10px">
        <el-checkbox
          v-model="form.taskAdditionalIncrement.alreadyBrowseTask"
          :true-label="1"
          :false-label="2"
          style="color: #97A8BE"
        >仅限做过该商品浏览任务的用户接单</el-checkbox>
      </span>
      <span style="font-size: 12px;color:red; ">+{{ cost.alreadyBrowseTaskAmount }}金/单</span>
    </div> -->

    <div class="step-title">第五步：填写附加要求</div>
    <div class="form-item">
      <span class="form-required" />
      <span class="form-label">添加图片说明</span>
      <span style="font-size: 12px;color:#bcbcbc;">如有需要备注可添加图片，最多可添加3张，图片中不要显示店铺名或商品名，避免用户直接搜索！</span>
    </div>
    <div class="form-item" style="position: relative">
      <span class="form-required" />
      <span class="form-label" />
      <div style="position: relative">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          style="margin-right: 20px;background-color: #F2F2F2"
          :http-request="uploadImageBz1"
          :show-file-list="false"
        >
          <img v-if="form.remarkImgUrl1" :src="form.remarkImgUrl1" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
        <i class="el-icon-circle-close avatar-uploader-remove" @click="removeAddImg1()" />
      </div>
      <div style="position: relative">
        <el-upload
          style="margin-right: 20px;background-color: #F2F2F2"
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :http-request="uploadImageBz2"
          :show-file-list="false"
        >
          <img v-if="form.remarkImgUrl2" :src="form.remarkImgUrl2" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
        <i class="el-icon-circle-close avatar-uploader-remove" @click="removeAddImg2()" />
      </div>
      <div style="position: relative">
        <el-upload
          style="margin-right: 20px;background-color: #F2F2F2"
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :http-request="uploadImageBz3"
          :show-file-list="false"
        >
          <img v-if="form.remarkImgUrl3" :src="form.remarkImgUrl3" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
        <i class="el-icon-circle-close avatar-uploader-remove" @click="removeAddImg3()" />
      </div>
    </div>
    <div class="form-item">
      <span class="form-required" />
      <span class="form-label" />
      <span style="color: #97A8BE;margin-right: 10px">备注</span>
    </div>
    <div class="form-item">
      <span class="form-required" />
      <span class="form-label" />
      <div class="remark">
        <el-input
          v-model="form.orderRemarks"
          type="textarea"
          maxlength="200"
          :autosize="{ minRows: 5, maxRows: 5}"
          placeholder="重要！如果对任务有特殊要求，请在这里备注清楚，用户接单后会看到，最多100字（任务备注只限商家要求，平台负责传达信息不会强制要求用户按照要求执行）"
        />
      </div>
    </div>

    <div style="text-align: center; margin-top: 65px">
      <el-button class="activity-button" style="margin-right: 80px;width: 100px" size="mini" @click="handlePre()">
        上一步
      </el-button>
      <el-button class="activity-button" style="width: 100px" size="mini" @click="handleNext()">
        下一步
      </el-button>
      <!--<el-button class="btn-theme" v-if="active >= 2" size="mini" @click="handleSuccess">付款并发布任务</el-button>-->
    </div>
    <div class="wrap" style="position:absolute;left:3000px;">
      <div class="optea">
        <div style="width:100px;height:100px;">
          <div ref="previewImg0" class="preview">
            <img :src="preImg || taskGoodsListimg" alt="" style="width:100px;height:100px;">
            <div class="watermark" :style="{ background: paint }" />
          </div>
          <div ref="previewImg1" class="preview" style="width:100px;height:100px;">
            <img :src="preImg1 || taskGoodsListimg1" alt="">
            <div class="watermark" :style="{ background: paint1 }" />
          </div>
          <div ref="previewImg2" class="preview" style="width:100px;height:100px;">
            <img :src="preImg2 || taskGoodsListimg2" alt="">
            <div class="watermark" :style="{ background: paint2 }" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  create,
  selectYwTaskSortWayList,
  selectYwTaskScreenshotCategoryList,
  selectYwGoodsCategoryList,
  uploadImageByBase64,
  selectYwTaskFeeConfig
} from '@/api/shop'
import VDistpicker from 'v-distpicker'
import { uploadImage } from '@/utils'
import defaultimg from '../../../../assets/web/c.png'
import DomToImage from 'dom-to-image'

export default {
  name: 'Tbll',
  components: { VDistpicker },
  props: {
    storeType: {
      required: true
    },
    taskType: {
      required: true
    },
    store: {
      required: true
    }
  },
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          const _now = Date.now()
          return time.getTime() < _now - 8.64e7
        }
      },
      defaultimgcanvas: [{
        id: 'defaultimgcanvas1'
      }, {
        id: 'defaultimgcanvas2'
      }, {
        id: 'defaultimgcanvas3'
      }], // 处理画布获取Id
      defaultimg: defaultimg,
      preImg: '',
      preImg1: '',
      preImg2: '',
      watermarkOptions: {
        text: '仅供 xxx 验证使用',
        fontSize: 1,
        width: 1,
        color: '#000',
        alpha: 35,
        rotate: 35
      },
      previewImg: [{
        id: 'previewImg0'
      }, {
        id: 'previewImg1'
      }, {
        id: 'previewImg2'
      }], // 处理画布获取Id
      uploads: [{
        id: 'uploads0'
      }, {
        id: 'uploads1'
      }, {
        id: 'uploads2'
      }], // 处理图片获取Id
      sumSun: [],
      nowDateTime: '',
      taskReleaseTimeList: [{ releaseTime: null, intervalTime: 0, orderNum: 1 }], // 定义发布任务时间变量
      orderout: 1, // 定时发布单量
      taskGoodsListimg: null,
      taskGoodsListimg1: '',
      taskGoodsListimg2: '',
      province: '',
      city: '',
      sex: '',
      imageUrl: '',
      addShop: 1,
      addKeyWord: 1,
      addewm: 1,
      addtkl: 1,
      checkList: [],
      order1: [],
      order2: [],
      order3: [],
      orderAll: 0,
      inputAll: 0, // 总单数
      taskCommentList: [],
      screenshotDetails: [], // 存放搜索货比的值
      arrMaxData: [],
      arrMinData: [],
      form: {
        taskGoodsList: [{
          name: null,
          content: null,
          url: null,
          img: null,
          showPrice: null,
          realPrice: null,
          payPeopleNum: null,
          mainFlag: 1,
          tbkFlag: 2
        }],
        taskReleaseTimeList: [],
        taskReleaseTime: '',
        interval: null,
        storeTypeId: null,
        storeId: null,
        taskTypeId: null,
        searchSortWay: null,
        searchType: 1,
        searchLocation: null,
        searchMaxPrice: null,
        searchMinPrice: null,
        orderNum: null,
        releaseDate: null,
        screenshotDetailIds: [],
        taskAdditionalIncrement: {
          toUp: 2,
          rewardAmount: null,
          weight: null,
          sex: null,
          minAge: null,
          maxAge: null,
          area: [],
          huaBei: 2,
          zuanHao: 2,
          alreadyBrowseTask: 2,
          goodsCategory: []
        },
        taskCommentList: [{ keyword: null }],
        orderRemarks: '',
        remarkImgUrl1: null,
        remarkImgUrl2: null,
        remarkImgUrl3: null
      },
      sortList: [],
      imgList: [],
      age: '',
      area: '',
      isReleaseDate: false,
      hour24Show: 0,
      ewmIndex: 0,
      shopIndex: 0,
      hour24Data: [],
      goodsCategoryList: [],
      cost: {}
    }
  },
  computed: {
    paint() {
      // 文字长度
      const wordWidth =
        this.watermarkOptions.fontSize *
        this.watermarkOptions.text.split('').length
      const width = wordWidth + this.watermarkOptions.width
      const svgText = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}px" height="${width}px">
    <text x="50%" y="50%"
        alignment-baseline="middle"
        text-anchor="middle"
        stroke="${this.watermarkOptions.color}"
        opacity="${this.watermarkOptions.alpha / 100}"
        transform="translate(${width / 2}, ${width / 2}) rotate(${
  this.watermarkOptions.rotate
}) translate(-${width / 2}, -${width / 2})"
        font-weight="100"
        font-size="${this.watermarkOptions.fontSize}"
        font-family="microsoft yahe"
        >
        ${this.watermarkOptions.text}
    </text>
   </svg>`
      return `url(data:image/svg+xml;base64,${btoa(
        unescape(encodeURIComponent(svgText))
      )})`
    },
    paint1() {
      // 文字长度
      const wordWidth =
        this.watermarkOptions.fontSize *
        this.watermarkOptions.text.split('').length
      const width = wordWidth + this.watermarkOptions.width
      const svgText = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}px" height="${width}px">
    <text x="50%" y="50%"
        alignment-baseline="middle"
        text-anchor="middle"
        stroke="${this.watermarkOptions.color}"
        opacity="${this.watermarkOptions.alpha / 100}"
        transform="translate(${width / 2}, ${width / 2}) rotate(${
  this.watermarkOptions.rotate
}) translate(-${width / 2}, -${width / 2})"
        font-weight="100"
        font-size="${this.watermarkOptions.fontSize}"
        font-family="microsoft yahe"
        >
        ${this.watermarkOptions.text}
    </text>
   </svg>`
      return `url(data:image/svg+xml;base64,${btoa(
        unescape(encodeURIComponent(svgText))
      )})`
    },
    paint2() {
      // 文字长度
      const wordWidth =
        this.watermarkOptions.fontSize *
        this.watermarkOptions.text.split('').length
      const width = wordWidth + this.watermarkOptions.width
      const svgText = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}px" height="${width}px">
    <text x="50%" y="50%"
        alignment-baseline="middle"
        text-anchor="middle"
        stroke="${this.watermarkOptions.color}"
        opacity="${this.watermarkOptions.alpha / 100}"
        transform="translate(${width / 2}, ${width / 2}) rotate(${
  this.watermarkOptions.rotate
}) translate(-${width / 2}, -${width / 2})"
        font-weight="100"
        font-size="${this.watermarkOptions.fontSize}"
        font-family="microsoft yahe"
        >
        ${this.watermarkOptions.text}
    </text>
   </svg>`
      return `url(data:image/svg+xml;base64,${btoa(
        unescape(encodeURIComponent(svgText))
      )})`
    },
    reSetData: {
      get() {
        return this.$store.getters.reSetData
      },
      set(val) {
        this.$store.commit('SET_RESETDATA', val)
      }
    }
  },
  watch: {
    order3: {
      handler: function(val, oldval) {
        for (let i = 0; i < val.length; i++) {
          if (!val[i] || val[i] === undefined) {
            this.order3[i] = 0
          }
        }
        var count = 0
        val.map(res => {
          count += Number(res)
        })
        this.orderAll = count
        this.inputAll = count
      },
      deep: true
    },
    order2: {
      handler: function(val, oldval) {
        for (let i = 0; i < val.length; i++) {
          if (!val[i] || val[i] === undefined) {
            this.order2[i] = 0
          }
        }
        var count = 0
        val.map(res => {
          count += Number(res)
        })
        this.orderAll = count
        this.inputAll = count
      },
      deep: true
    },
    order1: {
      handler: function(val, oldval) {
        for (let i = 0; i < val.length; i++) {
          if (!val[i] || val[i] === undefined) {
            this.order1[i] = 0
          }
        }
        var count = 0
        val.map(res => {
          count += Number(res)
        })
        this.orderAll = count
        this.inputAll = count
      },
      deep: true
    }
  },
  created() {
    this.init()
    this.form.storeId = this.store
    this.form.storeTypeId = this.storeType
    this.form.taskTypeId = this.taskType
  },
  mounted() {
    this.showDate()
    this.form.storeId = this.store
    this.form.storeTypeId = this.storeType
    this.form.taskTypeId = this.taskType
  },
  methods: {
    // 改变时间内响应修改单数
    changeValue() {
      var s = 0
      for (var t = 0; t < this.taskReleaseTimeList.length; t++) {
        s += Number(this.taskReleaseTimeList[t].orderNum)
      }
      this.orderAll = s
    },
    // 任务发布时间
    showDate() {
      var myDate = new Date()
      var month = myDate.getMonth() < 9 ? '0' + (myDate.getMonth() + 1) : myDate.getMonth() + 1
      var day = myDate.getDate() <= 9 ? '0' + (myDate.getDate()) : myDate.getDate()
      var dataToDate = myDate.getFullYear() + '-' + month + '-' + day
      var hours1 = myDate.getHours() <= 9 ? '0' + (myDate.getHours()) : myDate.getHours() // 获取系统时，
      var minutes1 = myDate.getMinutes() <= 9 ? '0' + (myDate.getMinutes()) : myDate.getMinutes() // 分
      var seconds1 = myDate.getSeconds() <= 9 ? '0' + (myDate.getSeconds()) : myDate.getSeconds() // 秒
      dataToDate = myDate.getFullYear() + '-' + month + '-' + day + ' ' + hours1 + ':' + minutes1 + ':' + seconds1
      this.form.releaseDate = dataToDate
      this.nowDateTime = dataToDate
      this.form.taskReleaseTime = dataToDate
      if (this.nowDateTime === dataToDate) {
        this.hour24Show = myDate.getHours() + 1
      } else {
        this.hour24Show = 0
      }
    },
    init() {
      selectYwTaskSortWayList({ storeTypeId: this.storeType }).then(response => {
        this.sortList = response.data
        if (response.data.length > 0) {
          this.form.searchSortWay = response.data[0].name
        }
      })
      selectYwTaskScreenshotCategoryList({ taskTypeId: this.taskType }).then(response => {
        this.imgList = response.data
      })
      selectYwGoodsCategoryList().then(response => {
        this.goodsCategoryList = response.data
      })

      selectYwTaskFeeConfig().then(response => {
        this.cost = response.data
        // this.form.searchSortWay = response.data[0].name
      })
    },
    // 数组分隔
    group(array, subGroupLength) {
      let index = 0
      const newArray = []
      while (index < array.length) {
        newArray.push(array.slice(index, index += subGroupLength))
      }
      return newArray
    },
    handlePre() {
      this.$parent.handleNextOrPre(false)
    },
    uploadImage1(e) {
      this.form.taskGoodsList[this.shopIndex].img = uploadImage(e)
    },
    // 数据处理
    uploadImg(e, num, item) {
      // this.defaultimg = ''
      var itemData = item - 1
      var that = this
      // this.defaultimgcanvas[0].id = null
      // 上传图片

      var reader = new FileReader()
      var file = e.target.files[0]
      if (itemData === 0) {
        if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
          alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
          return false
        }
        reader.onload = e => {
          let data
          if (typeof e.target.result === 'object') {
          // 把Array Buffer转化为blob 如果是base64不需要
            data = window.URL.createObjectURL(new Blob([e.target.result]))
          } else {
            data = e.target.result
          }
          if (num === 1) {
            this.preImg = data
            uploadImageByBase64(data).then(response => {
              that.taskGoodsListimg = response.data
            })
          }
        }
        if (file.size > 5119376) {
          // 转化为base64
          reader.readAsDataURL(file)
          // 转化为blob
          // reader.readAsArrayBuffer(file)
          this.$message({
            message: '图片过大，请稍后',
            type: 'info'
          })
          setTimeout(function() {
            that.handleDown(itemData)
          }, 70)
        } else if (file.size <= 5119376) {
          // 转化为base64
          reader.readAsDataURL(file)
          // 转化为blob
          // reader.readAsArrayBuffer(file)
          setTimeout(function() {
            that.handleDown(itemData)
          }, 20)
        }
        // setTimeout(function() {
        //   that.handleDown(itemData)
        // }, 100)
      } else if (itemData === 1) {
        if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
          alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
          return false
        }
        reader.onload = e => {
          let data
          if (typeof e.target.result === 'object') {
          // 把Array Buffer转化为blob 如果是base64不需要
            data = window.URL.createObjectURL(new Blob([e.target.result]))
          } else {
            data = e.target.result
          }
          if (num === 1) {
            this.preImg1 = data
            uploadImageByBase64(data).then(response => {
              this.taskGoodsListimg1 = response.data
            })
          }
        }
        if (this.taskGoodsListimg1 !== null) {
          if (file.size > 5119376 && file.size <= 9119376) {
          // 转化为base64
            reader.readAsDataURL(file)
            // 转化为blob
            // reader.readAsArrayBuffer(file)
            this.$message({
              message: '图片过大，请稍后',
              type: 'info'
            })
            setTimeout(function() {
              that.handleDown(itemData)
            }, 50)
          } else if (file.size <= 5119376) {
          // 转化为base64
            reader.readAsDataURL(file)
            // 转化为blob
            // reader.readAsArrayBuffer(file)
            setTimeout(function() {
              that.handleDown(itemData)
            }, 20)
          } else if (file.size > 9119376) {
            reader.readAsDataURL(file)
            // 转化为blob
            this.$message({
              message: '图片过大，若上传不成功，使用谷歌浏览器',
              type: 'info'
            })
            // reader.readAsArrayBuffer(file)
            setTimeout(function() {
              that.handleDown(itemData)
            }, 100)
          }
        }
      } else if (itemData === 2) {
        if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
          alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
          return false
        }
        reader.onload = e => {
          let data
          if (typeof e.target.result === 'object') {
          // 把Array Buffer转化为blob 如果是base64不需要
            data = window.URL.createObjectURL(new Blob([e.target.result]))
          } else {
            data = e.target.result
          }
          if (num === 1) {
            this.preImg2 = data
            uploadImageByBase64(data).then(response => {
              this.taskGoodsListimg2 = response.data
            })
          }
        }
        // 转化为base64
        // reader.readAsDataURL(file)、
        // 转化为blob
        // reader.readAsArrayBuffer(file)
        if (this.taskGoodsListimg2 !== null) {
          if (file.size > 5119376 && file.size <= 9119376) {
          // 转化为base64
            reader.readAsDataURL(file)
            // 转化为blob
            // reader.readAsArrayBuffer(file)
            this.$message({
              message: '图片过大，请稍后',
              type: 'info'
            })
            setTimeout(function() {
              that.handleDown(itemData)
            }, 50)
          } else if (file.size <= 5119376) {
          // 转化为base64
            reader.readAsDataURL(file)
            // 转化为blob
            // reader.readAsArrayBuffer(file)
            setTimeout(function() {
              that.handleDown(itemData)
            }, 20)
          } else if (file.size > 9119376) {
            reader.readAsDataURL(file)
            // 转化为blob
            this.$message({
              message: '图片过大，若上传不成功，使用谷歌浏览器',
              type: 'info'
            })
            // reader.readAsArrayBuffer(file)
            setTimeout(function() {
              that.handleDown(itemData)
            }, 100)
          }
        }
        // if (file.size > 5119376) {
        //   // 转化为base64
        //   reader.readAsDataURL(file)
        //   // 转化为blob
        //   // reader.readAsArrayBuffer(file)
        //   this.$message({
        //     message: '图片过大，请稍后',
        //     type: 'info'
        //   })
        //   setTimeout(function() {
        //     that.handleDown(itemData)
        //   }, 50)
        // } else if (file.size <= 5119376) {
        //   // 转化为base64
        //   reader.readAsDataURL(file)
        //   // 转化为blob
        //   // reader.readAsArrayBuffer(file)
        //   setTimeout(function() {
        //     that.handleDown(itemData)
        //   }, 20)
        // }
      }
    },
    // 数据处理
    handleDown(itemData) {
      var node = null
      var node1 = null
      var node2 = null
      const that = this
      node = this.$refs.previewImg0
      node1 = this.$refs.previewImg1
      node2 = this.$refs.previewImg2
      DomToImage.toPng(node)
        .then(function(dataUrl) {
          that.$nextTick(() => {
            uploadImageByBase64(dataUrl).then(response => {
              that.form.taskGoodsList[0].img = response.data
            })
          })
        })
      if (itemData === 1) {
        DomToImage.toPng(node1)
          .then(function(dataUrl) {
            that.$nextTick(() => {
              uploadImageByBase64(dataUrl).then(response => {
                that.form.taskGoodsList[1].img = response.data
              })
            })
          })
      }
      if (itemData === 2) {
        DomToImage.toPng(node2)
          .then(function(dataUrl) {
            that.$nextTick(() => {
              uploadImageByBase64(dataUrl).then(response => {
                that.form.taskGoodsList[2].img = response.data
              })
            })
          })
      }
    },
    uploadImageShopChange(index) {
      this.shopIndex = index
    },
    uploadImageBz1(e) {
      this.form.remarkImgUrl1 = uploadImage(e)
    },
    uploadImageBz2(e) {
      this.form.remarkImgUrl2 = uploadImage(e)
    },
    uploadImageBz3(e) {
      this.form.remarkImgUrl3 = uploadImage(e)
    },
    uploadImageEwm(e) {
      this.form.taskCommentList[this.ewmIndex].qrCodeImgUrl = uploadImage(e)
    },
    uploadImageEwmChange(index) {
      this.ewmIndex = index
    },
    onChangeProvince(a) {
      if (a.value !== '省') {
        this.form.searchLocation = a.value
      }
    },
    onChangeCity(a) {
      if (a.value !== '市') {
        if (!this.form.searchLocation.includes('|')) {
          this.form.searchLocation = this.form.searchLocation + '|' + a.value
        } else {
          var arrcity = this.form.searchLocation.split('|')
          this.form.searchLocation = arrcity[0] + '|' + a.value
        }
      }
    },
    removeMainImg(val) {
      this.form.taskGoodsList[val - 1].img = ''
    },
    removeAddImg1() {
      this.form.remarkImgUrl1 = ''
    },
    removeAddImg2() {
      this.form.remarkImgUrl2 = ''
    },
    removeAddImg3() {
      this.form.remarkImgUrl3 = ''
    },
    // 删除空包
    delIncrement() {
      this.form.taskAdditionalIncrement.courierCompanyId = null
      this.form.taskAdditionalIncrement.weight = null
    },
    // 删除附加商品
    delStore(index) {
      this.addShop--
      this.form.taskGoodsList.splice(index - 1, 1)
    },
    // 删除附加商品
    delStore(index) {
      this.addShop--
      this.form.taskGoodsList.splice(index - 1, 1)
    },
    // 删除关键词
    delGuanjc(index) {
      if (this.form.taskCommentList.length === 1) {
        return
      }
      this.addKeyWord--
      this.form.taskCommentList.splice(index - 1, 1)
      this.order1.splice(index - 1, 1)
    },
    handleGuanjc() {
      if (this.addKeyWord < 10) {
        this.addKeyWord++
        this.form.taskCommentList.push({ type: this.form.commentType, keyword: null })
      }
    },
    // 删除淘口令
    delkl(index) {
      if (this.form.taskCommentList.length === 1) {
        return
      }
      this.addtkl--
      this.form.taskCommentList.splice(index - 1, 1)
      this.order2.splice(index - 1, 1)
    },
    handletkl() {
      if (this.addtkl < 10) {
        this.addtkl++
        this.form.taskCommentList.push({ type: this.form.commentType, keyword: null })
      }
    },
    // 删除二维码
    delewm(index) {
      if (this.form.taskCommentList.length === 1) {
        return
      }
      this.addewm--
      this.form.taskCommentList.splice(index - 1, 1)
      this.order3.splice(index - 1, 1)
    },
    handleewm() {
      if (this.addewm < 10) {
        this.addewm++
        this.form.taskCommentList.push({ type: this.form.commentType, qrCodeImgUrl: null })
      }
    },
    // 增加放单计划
    handleout() {
      this.orderout++
      this.taskReleaseTimeList.push({ releaseTime: '', intervalTime: 0, orderNum: 0 })
    },
    // 删除放单计划
    deleout(index) {
      if (this.taskReleaseTimeList.length === 1) {
        return
      }
      this.orderout--
      this.taskReleaseTimeList.splice(index - 1, 1)
      var s = 0
      for (var t = 0; t < this.taskReleaseTimeList.length; t++) {
        s += Number(this.taskReleaseTimeList[t].orderNum)
      }
      this.orderAll = s
      // this.order3.splice(index - 1, 1)
    },
    handleDearchType(val) {
      this.addKeyWord = 1
      this.addtkl = 1
      this.addewm = 1
      this.order1 = []
      this.order2 = []
      this.order3 = []
      if (val === 1) {
        this.form.taskCommentList = [{ type: this.form.commentType, keyword: null }]
      } else if (val === 2) {
        this.form.taskCommentList = [{ type: this.form.commentType, keyword: null }]
      } else if (val === 3) {
        this.form.taskCommentList = [{ type: this.form.commentType, qrCodeImgUrl: null }]
      }
    },
    handleReleaseDate(val) {
      this.handleChangeReleaseDate(true)
      var myDate = new Date()
      var month = myDate.getMonth() < 9 ? '0' + (myDate.getMonth() + 1) : myDate.getMonth() + 1
      var day = myDate.getDate() <= 9 ? '0' + (myDate.getDate()) : myDate.getDate()
      var dataToDate = myDate.getFullYear() + '-' + month + '-' + day
      if (val === dataToDate) {
        this.hour24Show = myDate.getHours() + 1
      } else {
        this.hour24Show = 0
      }
    },
    handleNext() {
      if (this.inputAll !== this.totalSearch()) {
        this.$message({
          message: '发布的单量不正确',
          type: 'warning'
        })
        return
      }
      if (this.form.taskGoodsList[0].url.indexOf('id=') === -1) {
        this.form.taskGoodsList[0].url = ''
        this.$message({
          message: '商品链接不正确请重新输入',
          type: 'warning'
        })
      }
      if (this.form.taskGoodsList.length > 1) {
        if (this.form.taskGoodsList[1].url.indexOf('id=') === -1) {
          this.form.taskGoodsList[1].url = ''
        }
        if (this.form.taskGoodsList.length === 3) {
          if (this.form.taskGoodsList[2].url.indexOf('id=') === -1) {
            this.form.taskGoodsList[2].url = ''
          }
        }
      }
      this.hour24ToResult()
      var age = this.age
      var ageArray = age.split('-')
      if (ageArray.length === 2) {
        this.form.taskAdditionalIncrement.maxAge = ageArray[1]
      }
      this.form.taskAdditionalIncrement.minAge = ageArray[0]
      // var data = Object.assign({},this.form);
      var data = JSON.parse(JSON.stringify(this.form))
      data.orderNum = this.orderAll
      if (data.screenshotDetailIds.length > 0) {
        if (this.arrMinData.length > 0) {
          if (this.arrMaxData.length > 0) {
            data.screenshotDetailIds.splice(0, 0, this.arrMinData)
            data.screenshotDetailIds.splice(0, 0, this.arrMaxData)
            data.screenshotDetailIds = data.screenshotDetailIds.join(',')
          } else {
            data.screenshotDetailIds.splice(0, 0, this.arrMinData)
            data.screenshotDetailIds = data.screenshotDetailIds.join(',')
          }
        } else {
          if (this.arrMaxData.length > 0) {
            data.screenshotDetailIds.splice(0, 0, this.arrMinData)
            data.screenshotDetailIds = data.screenshotDetailIds.join(',')
          } else {
            data.screenshotDetailIds = data.screenshotDetailIds.join(',')
          }
        }
      } else if (this.arrMinData.length > 0 || this.arrMaxData.length > 0) {
        if (this.arrMinData.length > 0) {
          if (this.arrMaxData.length > 0) {
            data.screenshotDetailIds.splice(0, 0, this.arrMinData)
            data.screenshotDetailIds.splice(0, 0, this.arrMaxData)
            data.screenshotDetailIds = data.screenshotDetailIds.join(',')
          } else {
            data.screenshotDetailIds.splice(0, 0, this.arrMinData)
            data.screenshotDetailIds = data.screenshotDetailIds.join(',')
          }
        } else {
          if (this.arrMaxData.length > 0) {
            data.screenshotDetailIds.splice(0, 0, this.arrMinData)
            data.screenshotDetailIds = data.screenshotDetailIds.join(',')
          } else {
            data.screenshotDetailIds = data.screenshotDetailIds.join(',')
          }
        }
      } else {
        data.screenshotDetailIds = null
      }
      if (data.taskAdditionalIncrement.goodsCategory.length > 0) {
        data.taskAdditionalIncrement.goodsCategory = data.taskAdditionalIncrement.goodsCategory.join(',')
      }
      if (data.taskAdditionalIncrement.area.length > 0) {
        data.taskAdditionalIncrement.area = data.taskAdditionalIncrement.area.join(',')
      }
      data.taskAdditionalIncrement = JSON.stringify(data.taskAdditionalIncrement)
      // this.order1[i] = this.orderAll

      // 进行判断，如果是循环每一个关键词和单数都要遍历
      data.taskCommentList = []
      for (let i = 0; i <= this.form.taskCommentList.length; i++) {
        for (let j = 0; j < this.order1[i]; j++) {
          data.taskCommentList.push(JSON.parse(JSON.stringify(this.form.taskCommentList[i])))

          // data.taskCommentList.push(JSON.parse(JSON.stringify(this.form.taskCommentList[i])))
        }
      }
      for (let i = 0; i <= this.form.taskCommentList.length; i++) {
        for (let j = 0; j < this.order2[i]; j++) {
          data.taskCommentList.push(JSON.parse(JSON.stringify(this.form.taskCommentList[i])))

          // data.taskCommentList.push(JSON.parse(JSON.stringify(this.form.taskCommentList[i])))
        }
      }
      for (let i = 0; i <= this.form.taskCommentList.length; i++) {
        for (let j = 0; j < this.order3[i]; j++) {
          data.taskCommentList.push(JSON.parse(JSON.stringify(this.form.taskCommentList[i])))

          // data.taskCommentList.push(JSON.parse(JSON.stringify(this.form.taskCommentList[i])))
        }
      }
      data.taskCommentList = JSON.stringify(data.taskCommentList)
      data.taskGoodsList[0].gid = this.urltoid(data.taskGoodsList[0].url)
      if (data.taskGoodsList.length >= 2) {
        data.taskGoodsList[1].gid = this.urltoid(data.taskGoodsList[1].url)
        if (data.taskGoodsList.length === 3) {
          data.taskGoodsList[2].gid = this.urltoid(data.taskGoodsList[2].url)
        }
      }
      data.taskGoodsList = JSON.stringify(data.taskGoodsList)
      // data.taskReleaseTimeList = JSON.stringify(data.taskReleaseTimeList)
      this.form.storeId = this.store
      this.form.storeTypeId = this.storeType
      this.form.taskTypeId = this.taskType
      // data.taskReleaseTimeList = JSON.stringify(data.taskReleaseTimeList)
      // data.taskReleaseTime = this.form.taskReleaseTime
      var taskReleasedata = this.form.taskReleaseTime
      // console.log('taskReleasedata', this.taskReleaseTimeList[0].releaseTime < taskReleasedata, this.taskReleaseTimeList[0].releaseTime, taskReleasedata)
      for (var t = 0; t < this.taskReleaseTimeList.length; t++) {
        if (this.taskReleaseTimeList[t].releaseTime === '' || this.taskReleaseTimeList[t].releaseTime === null || this.taskReleaseTimeList[t].releaseTime < taskReleasedata) {
          this.taskReleaseTimeList[t].releaseTime = this.form.taskReleaseTime
        }
      }
      data.taskReleaseTimeList = JSON.stringify(this.taskReleaseTimeList)
      console.log('data', data)
      create(data).then(response => {
        if (response.code === 0) {
          this.$parent.handlePrice(response.data)
        } else {
          this.$message({
            message: response.msg,
            type: 'warning'
          })
        }
      })
    },
    stitchingData(keyword, otherKey, num) {
      var data = []
      var otherkeyItem = 0
      for (var i = 0; i < keyword.length; i++) {
        for (var j = 0; j < num[i]; j++) {
          const item = {}
          if (otherKey.length > 0) {
            Object.assign(item, keyword[i], otherKey[otherkeyItem])
          } else {
            Object.assign(item, keyword[i])
          }
          otherkeyItem++
          data.push(item)
        }
      }
      return data
    },
    urltoid(data) {
      var idData = []
      var idNum = []
      if (data.indexOf('?id=') !== -1) {
        idData = data.split('?id=')
        idNum = idData[1].split('&')
      }
      if (data.indexOf('&id=') !== -1) {
        idData = data.split('&id=')
        idNum = idData[1].split('&')
      }
      return idNum[0]
    },
    hour24ToResult() {
      var array = {}
      for (var i = 0; i < 24; i++) {
        if (this.hour24Data[i] > 0) {
          var hour
          if (i < 10) {
            hour = '0' + i
          } else {
            hour = i
          }
          array.push({
            orderNum: this.hour24Data[i],
            releaseTime: this.form.releaseDate + ' ' + hour + ':00:00'
          })
        }
      }
      this.form.taskReleaseTimeList = array
    },
    totalSearch() {
      var count = 0
      if (this.form.searchType === 1) {
        this.order1.map(res => {
          count += Number(res)
        })
      } else if (this.form.searchType === 2) {
        this.order2.map(res => {
          count += Number(res)
        })
      } else {
        this.order3.map(res => {
          count += Number(res)
        })
      }
      return count
    },
    inputBlur(e) {
      if (e.target.value.indexOf('id=') === -1) {
        console.log(e.target.value)
        e.target.value = ''
        this.$message({
          message: '商品链接不正确请重新输入',
          type: 'warning'
        })
        return
      }
      // if (e.target.value.indexOf('.taobao.com') === -1 && e.target.value.indexOf('.tmall.com') === -1) {
      //     console.log(e.target.value)
      //     this.$message({
      //         message: '商品链接不正确请重新输入',
      //         type: 'warning'
      //     })
      //     return
      // }
    },
    // 搜索货比单选
    handleCheckBox(val) {
      this.maxToMin(val, 4)
    },
    maxToMin(arr, num) {
      var arrMin = []
      var arrMax = []
      var max = null
      var min = null
      for (var i = 0; i < arr.length; i++) {
        if (num >= arr[i]) {
          arrMin.push(arr[i])
        } else if (num < arr[i]) {
          arrMax.push(arr[i])
        }
      }
      max = arrMax[arrMax.length - 1]
      min = arrMin[arrMin.length - 1]
      this.screenshotDetails = []
      this.screenshotDetails = [max, min]
      if (min === 1) {
        arrMin = 1
      } else if (min === 2) {
        arrMin = 1 + ',' + 2
      } else if (min === 3) {
        arrMin = 1 + ',' + 2 + ',' + 3
      } else if (min === 4) {
        arrMin = 1 + ',' + 2 + ',' + 3 + ',' + 4
      } else {
        arrMin = ''
      }
      if (max === 5) {
        arrMax = 5
      } else if (max === 6) {
        arrMax = 5 + ',' + 6
      } else if (max === 7) {
        arrMax = 5 + ',' + 6 + ',' + 7
      } else {
        arrMax = ''
      }
      this.arrMaxData = arrMax
      this.arrMinData = arrMin
    },
    handleChangeReleaseDate(val) {
      if (this.form.releaseDate === null || this.form.releaseDate === '') {
        this.$message({
          message: '时间不能为空！',
          type: 'warning'
        })
        this.isReleaseDate = false
        return
      }
      if (val) {
        this.orderAll = this.totalSearch()
        this.inputAll = this.totalSearch()
        var myDate = new Date()
        var month = myDate.getMonth() < 9 ? '0' + (myDate.getMonth() + 1) : myDate.getMonth() + 1
        var day = myDate.getDate() <= 9 ? '0' + (myDate.getDate()) : myDate.getDate()
        var dataToDate = myDate.getFullYear() + '-' + month + '-' + day
        var allData = this.orderAll
        var array = new Array()
        let len = 0
        if (allData) {
          if (this.form.releaseDate && this.form.releaseDate === dataToDate) {
            len = 24 - parseInt(myDate.getHours() + 1)
            if (len > allData) {
              len = allData
            }
            const Arr = this.randomArr(allData, 1, allData, len)
            for (let j = myDate.getHours() + 1; j < 24; j++) {
              const index = j - myDate.getHours() - 1
              array[j] = Arr[index]
            }
          } else {
            len = 24
            if (len > allData) {
              len = allData
            }
            const Arr = this.randomArr(allData, 1, allData, len)
            for (var i = 0; i < 24; i++) {
              array[i] = Arr[i]
              this.sumSun = Arr[i]
            }
          }
        }
        this.hour24Data = array
      }
    },
    randomArr(value, min, max, length) {
      var ran = []; var arrId
      // 循环存放数组最小值
      for (var i = 0; i < length; i++) {
        ran[i] = min
        this.sumSun += ran[i]
      }
      // 计算剩下的值
      var spare = value - (min * length)
      while (spare > 0) {
        // 生成数组随机ID
        arrId = Math.round(Math.random() * length)
        if (ran[arrId] < max) {
          ran[arrId] += 1
          spare--
        }
      }
      return ran
    },
    clickItemAge(index) {
      index === this.age ? this.age = '' : this.age = index
    },
    clickItem(index) {
      index === this.form.taskAdditionalIncrement.sex ? this.form.taskAdditionalIncrement.sex = '' : this.form.taskAdditionalIncrement.sex = index
    }
  }
}
</script>

<style scoped>
  .pr >>> .distpicker-address-wrapper select {
    color: #97A8BE;
    width: 100px;
    height: 32px;
    font-size: inherit;
    padding: 0 .75rem;
  }
.wrap {
  padding: 10px 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;

}
p {
    margin: 5px 0;
    margin-bottom: 10px;
    font-weight: 600;
  }
  .download-btn {
    margin: 0 15px 15px;
  }
  .optea {
    width: 100px;
  }
  .preview {
    position: relative;
    min-width: 100px;

  }
   img {
      width: 100%;
      height: 100%;
    }
    .watermark {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }
  .radio-none >>> .el-radio__input {
    display: none;
  }

  .radio-none >>> .el-radio {
    margin-right: 8px;
  }

  .radio-none >>> .el-radio__label {
    padding-left: 0;
  }

  .radio-none >>> .el-radio--mini.is-bordered {
    padding: 6px 9px 0 10px
  }

  .form .form-action {
    width: 3em;
  }

  .form .form-action i {
    font-size: 26px;
    color: #6666FF
  }

  .boder-all {
    border: 1px solid #BCBCBC
  }

  .table td {
    border: 1px solid #6666FF;
  }

  .activity-button {
    border-color: #6666FF !important;
    color: #6666FF !important;
  }

  .radio-list .item {
    padding-left: 10px;
    display: flex;
    color: #333;
  }

  .radio-list .radio {
    margin-right: 4px;
  }

  .radio-list .radio-tip {
    color: #BCBCBC;
    font-size: 14px;
  }

  .radio-list-logo {
    width: 25px;
    position: relative;
    top: 8px;
    margin-right: 5px;
  }

  .radio-list >>> .el-radio__input.is-checked + .el-radio__label {
    color: #606266;
  }

  .radio-list >>> .el-radio__input.is-checked .el-radio__inner {
    border-color: #6666FF;
    background: #6666FF;
  }

  .radio-list-new {
    width: 30px;
    height: 30px;
    position: relative;
    top: 1px;
  }

  .form .checkbox {
    margin-left: 14px;
  }

  .item-img {
    width: 30px;
    height: 30px;
  }

  .radio-list-y >>> .el-radio-button__inner, .el-radio-group {
    font-size: initial;
    display: inline-block;
    line-height: unset;
    vertical-align: middle;
  }

  .addShop {
    position: absolute;
    right: 0;
    top: 13px;
  }

  .step-title {
    margin-top: 24px;
    line-height: 32px;
    text-align: center;
    background-color: #6666FF;
    color: white;
    font-size: 16px;
  }

  .w400 {
    width: 400px;
  }

  .form .form-err-change {
    padding: 6px 0 6px 54px;
    font-size: 12px;
  }

  .avatar-uploader {
    border: 1px dashed #6666FF;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 100px;
    height: 100px;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }

  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }

  .epshow {
    position: absolute;
    left: 173px;
    bottom: -29px;
  }

  .upload-d {
    font-size: 12px;
    position: absolute;
    bottom: 0px;
    color: #bcbcbc;
  }

  .upload-e {
    position: absolute;
    bottom: 0px;
    right: 0;
    font-size: 12px;
  }

  .form .form-label {
    min-width: 7em;
  }

  .form-label-price {
    min-width: 5em !important;
    margin-left: 39px;
  }

  .form-label >>> .el-radio__input.is-checked .el-radio__inner {
    border-color: #6666FF;
    background: #6666FF;
  }

  .form-label >>> .el-radio__input.is-checked + .el-radio__label {
    color: #606266;
  }

  .clock-list {
    margin-top: 8px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    text-align: center;
  }

  .clock-list .item {
    margin-bottom: 16px;
    width: 7.7%;
    display: flex;
    flex-direction: column;
    border: 1px solid #6666FF;
  }

  .clock-list .sp1 {
    line-height: 32px;
    background-color: #6666FF;
    color: white;
  }

  .clock-list .sp2 {
    padding: 0 8px;
    width: 100%;
    height: 32px;
    text-align: center;
    font-size: 16px;
    color: #666;
    box-sizing: border-box;
  }

  .checkbox-mr >>> .el-checkbox__inner {
    width: 28px;
    height: 28px
  }

  .checkbox-mr >>> .el-checkbox__input.is-checked .el-checkbox__inner::after {
    transform: rotate(45deg) scaleY(3);
  }

  .checkbox-mr >>> .el-checkbox__inner::after {
    left: 9px;
    top: 7px;
    width: 8px;
  }

  .checkbox-mr {
    margin-right: 20px;
    position: relative;
    height: 54px;
  }

  .checkbox-tip {
    color: red;
    position: absolute;
    font-size: 12px;
    bottom: 0;
    width: 70px;
    right: 0;
  }

  .checkbox-button-width {
    width: 82px
  }

  .form-item >>> .el-button--mini, .el-button--mini.is-round {
    padding: 7px 7px;
  }

  .checkbox-list {
    border: 1px solid #BCBCBC;
    width: 500px;
    height: 280px;
    border-radius: 5px;
    padding: 10px
  }

  /deep/ .el-textarea__inner {
    border: 1px dashed #BCBCBC;
  }

  .avatar-uploader-remove {
    position: absolute;
    top: -16px;
    right: 7px;
    color: #6666FF;
    font-size: 20px;
  }

  .remark {
    width: 600px;
    border-radius: 5px;
    padding: 10px;
    color: #BCBCBC;
    font-size: 12px
  }

  .activity-page >>> .el-dialog__header {
    padding: 0
  }

  .activity-page >>> .el-dialog__body {
    padding: 2px
  }

  /deep/ input::-webkit-outer-spin-button,
  /deep/ input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  /deep/ input[type="number"] {
    -moz-appearance: textfield;
  }

  /deep/ input::-webkit-outer-spin-button,
  /deep/ input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  /deep/ input[type="number"] {
    -moz-appearance: textfield;
  }

</style>
