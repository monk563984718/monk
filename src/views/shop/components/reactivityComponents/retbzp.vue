<template>
  <div class="form" style="position:relative;">
    <div class="step-title">第一步：填写商品信息</div>
    <div v-for="item in addShop">
      <el-divider v-if="item!==1">附加商品{{ item-1 }}</el-divider>
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
          <i class="el-icon-circle-close avatar-uploader-remove" style="position: absolute;right:0;" @click="removeMainImg(item)" />
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
        <span class="form-label form-label-price">实际成交价：</span>
        <el-input v-model="form.taskGoodsList[item-1].realPrice" size="mini" :min="0" style="width: 140px">
          <template slot="append">元</template>
        </el-input>
        <span class="form-label form-label-price">付款人数：</span>
        <el-input v-model="form.taskGoodsList[item-1].payPeopleNum" size="mini" :min="0" style="width: 140px">
          <template slot="append">人</template>
        </el-input>
      </div>
      <div class="form-item">
        <span class="form-required">*必填</span>
        <span class="form-label">每单拍：</span>
        <el-input-number v-model="form.taskGoodsList[item-1].num" size="mini" :min="1" style="width: 130px" />
        <span class="form-label" style="margin-left: 10px">件</span>
      </div>
      <div class="form-item" style="margin-top: 35px">
        <span class="form-required" />
        <span class="form-label">商品是否开通淘客推广：</span>
        <el-radio-group v-model="form.taskGoodsList[item-1].tbkFlag">
          <el-radio :label="1" style="color:#97A8BE ">是</el-radio>
          <el-radio :label="2" style="color:#97A8BE ">否</el-radio>
        </el-radio-group>
      </div>

    </div>
    <div class="form-item" style="margin-top: 0">
      <span class="form-required" />
      <el-button type="text" @click="handleAddGood">+新增附加商品</el-button>
      <span style="font-size: 12px;color:#bcbcbc;padding: 12px 0 ">（最多可添加2个附加商品）</span>
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
      <!-- <span class="form-required">*必填</span> -->
      <span class="form-label">订单留言：</span>
      <el-input v-model="form.orderMessageBoard" size="small" placeholder="最多50字！" style="width: 400px" />
      <div class="form-err" style="font-size: 12px"> （用户下单给商家的留言，谨慎使用！）</div>
    </div>

    <div class="step-title">第三步：设置评价类型</div>
    <div class="form-item">
      <span class="form-required">*必填</span>
      <span class="form-label">选择评价类型：</span>
      <div class="form-block radio-list">
        <el-radio-group
          v-model="form.commentType"
          class="item"
          style="padding-top: 10px;"
          fill="red"
          text-color="#6666FF"
        >
          <el-radio :label="1" style="margin-right: 10px">
            普通好评任务
          </el-radio>
          <el-radio :label="2" style="margin-right: 10px">
            指定文字好评
            <span style="color: red;font-size: 12px;">+{{ cost.wordAmount }}金/单</span></el-radio>
          <el-radio :label="3" style="margin-right: 10px">
            指定图片好评
            <span style="color: red;font-size: 12px;">+{{ cost.imageAmount }}金/单</span>
          </el-radio>
          <el-radio :label="4" style="margin-right: 10px">
            指定视频好评
            <span style="color: red;font-size: 12px;">+{{ cost.videoAmount }}金/单</span>
          </el-radio>
        </el-radio-group>
      </div>
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
    <div class="form-item" style="margin:0;padding:0;">
      <span style="width:600px;" />
      <span style="color: #97A8BE;width: 100px;text-align: center">总共添加</span>
      <!-- <el-input v-model="orderAll" size="mini" :min="1" style="width: 100px;text-align: center" /> -->
      <span>{{ inputAll }}</span>
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

    <div v-for="item in addpj" v-if="form.commentType===2" class="form-item">
      <span class="form-required">{{ item===1?'*必填':'' }}</span>
      <span class="form-label">文字好评{{ item }}：</span>
      <el-input
        v-model="wzList[item-1].content"
        type="textarea"
        :rows="2"
        maxlength="125"
        size="small"
        style="width: 350px"
      />
    </div>

    <div v-for="item in addpj" v-if="form.commentType===3">
      <div class="form-item">
        <span class="form-required">{{ item===1?'*必填':'' }}</span>
        <span class="form-label">第{{ item }}单：</span>
      </div>
      <div class="form-item">
        <span class="form-required" />
        <span class="form-label">设置照片中的商品规格：</span>
        <el-input v-model="tpList[item-1].norm" size="small" style="width: 350px" placeholder=" 如颜色、尺寸等" />
        <div class="form-err" style="font-size: 12px"> (规格设置务必要与图片中的商品规格保持一致)</div>
      </div>
      <div class="form-item">
        <span class="form-required" />
        <span class="form-label">评价图片：</span>
        <span style="font-size: 12px;color:#bcbcbc;">（最多可添加5张图片）</span>
      </div>
      <div class="form-item">
        <span class="form-required" />
        <div style="position: relative">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            style="margin-right: 20px;background-color: #F2F2F2;"
            :before-upload="function(file) {
              return uploadImagePjtpChange(item-1,1)
            }"
            :http-request="uploadImagePjtp"
            :show-file-list="false"
          >
            <img v-if="tpList[item-1].imgUrl1" :src="tpList[item-1].imgUrl1" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
          <i class="el-icon-circle-close avatar-uploader-remove" @click="tpList[item-1].imgUrl1=null" />

        </div>
        <div style="position: relative">
          <el-upload
            style="margin-right: 20px;background-color: #F2F2F2"
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :before-upload="function(file) {
              return uploadImagePjtpChange(item-1,2)
            }"
            :http-request="uploadImagePjtp"
            :show-file-list="false"
          >
            <img v-if="tpList[item-1].imgUrl2" :src="tpList[item-1].imgUrl2" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
          <i class="el-icon-circle-close avatar-uploader-remove" @click="tpList[item-1].imgUrl2=null" />

        </div>
        <div style="position: relative">
          <el-upload
            style="margin-right: 20px;background-color: #F2F2F2"
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :before-upload="function(file) {
              return uploadImagePjtpChange(item-1,3)
            }"
            :http-request="uploadImagePjtp"
            :show-file-list="false"
          >
            <img v-if="tpList[item-1].imgUrl3" :src="tpList[item-1].imgUrl3" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
          <i class="el-icon-circle-close avatar-uploader-remove" @click="tpList[item-1].imgUrl3=null" />

        </div>
        <div style="position: relative">
          <el-upload
            style="margin-right: 20px;background-color: #F2F2F2"
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :before-upload="function(file) {
              return uploadImagePjtpChange(item-1,4)
            }"
            :http-request="uploadImagePjtp"
            :show-file-list="false"
          >
            <img v-if="tpList[item-1].imgUrl4" :src="tpList[item-1].imgUrl4" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
          <i class="el-icon-circle-close avatar-uploader-remove" @click="tpList[item-1].imgUrl4=null" />

        </div>
        <div style="position: relative">
          <el-upload
            style="background-color: #F2F2F2"
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :before-upload="function(file) {
              return uploadImagePjtpChange(item-1,5)
            }"
            :http-request="uploadImagePjtp"
            :show-file-list="false"
          >
            <img v-if="tpList[item-1].imgUrl5" :src="tpList[item-1].imgUrl5" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
          <i
            class="el-icon-circle-close avatar-uploader-remove"
            style="right: -13px"
            @click="tpList[item-1].imgUrl5=null"
          />

        </div>

      </div>
      <div class="form-item">
        <span class="form-required" />
        <span class="form-label">评语：</span>
        <el-input
          v-model="tpList[item-1].content"
          type="textarea"
          :rows="2"
          size="small"
          maxlength="125"
          style="width: 350px"
          placeholder=""
        />

      </div>
      <el-divider />
    </div>
    <div v-for="item in addpj" v-if="form.commentType===4">
      <div class="form-item">
        <span class="form-required">{{ item===1?'*必填':'' }}</span>
        <span class="form-label">第{{ item }}单：</span>
      </div>
      <div class="form-item">
        <span class="form-required" />
        <span class="form-label">设置视频中的商品规格：</span>
        <el-input v-model="spList[item-1].norm" size="small" style="width: 350px" placeholder=" 如颜色、尺寸等" />
        <div class="form-err" style="font-size: 12px"> (规格设置务必要与视频中的商品规格保持一致)</div>
      </div>
      <div class="form-item" style="position:relative;">
        <span class="form-required" />
        <span class="form-label">选择视频：</span>
        <el-upload
          class="avatar-uploader el-upload--text"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          accept=".mp4, .avi, .wmv"
          :on-success="handleVideoSuccess"
          :before-upload="function(file) {
            beforeUploadVideo()
            return uploadImagePjspChange(item-1,5)
          }"
          :on-progress="uploadVideoProcess"
          :http-request="uploadImagePjsp"
        >
          <video
            v-if="spList[item-1].videoUrl"
            :src="spList[item-1].videoUrl"
            class="avatar video-avatar"
            controls="controls"
            height="100px"
          >
            您的浏览器不支持视频播放
          </video>
          <el-progress
            v-if="videoFlag == true"
            type="circle"
            :percentage="videoUploadPercent"
            style="margin-top:1000px;"
          />
          <i class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
        <i class="el-icon-circle-close avatar-uploader-remove avatar-uploader-remove-class" @click="spList[item-1].videoUrl=null" />
      </div>
      <div class="form-item">
        <span class="form-required" />
        <span class="form-label">评语：</span>
        <el-input
          v-model="spList[item-1].content"
          type="textarea"
          :rows="2"
          size="small"
          maxlength="125"
          style="width: 350px"
          placeholder=""
        />

      </div>
      <el-divider />
    </div>

    <div class="form-item">
      <span class="form-required">*必填</span>
      <span class="form-label">选择追评类型：</span>
      <div class="form-block radio-list">
        <el-radio-group
          v-model="form.appendCommentType"
          class="item"
          style="padding-top: 10px;"
          fill="red"
          text-color="#6666FF"
        >
          <el-radio :label="1" style="margin-right: 10px">
            普通好评任务
          </el-radio>
          <el-radio :label="2" style="margin-right: 10px">
            指定文字好评
            <span style="color: red;font-size: 12px;">+{{ cost.wordAmount }}金币/单</span></el-radio>
          <el-radio :label="3" style="margin-right: 10px">
            指定图片好评
            <span style="color: red;font-size: 12px;">+{{ cost.imageAmount }}金币/单</span>
          </el-radio>
          <el-radio :label="4" style="margin-right: 10px">
            指定视频好评
            <span style="color: red;font-size: 12px;">+{{ cost.videoAmount }}金币/单</span>
          </el-radio>
        </el-radio-group>
      </div>
    </div>

    <div v-for="item in addpjzp" v-if="form.appendCommentType===2" class="form-item">
      <span class="form-required">{{ item===1?'*必填':'' }}</span>
      <span class="form-label">文字好评{{ item }}：</span>
      <el-input
        v-model="zpwzList[item-1].appendContent"
        type="textarea"
        :rows="2"
        size="small"
        maxlength="125"
        style="width: 350px"
      />
    </div>

    <div v-for="item in addpjzp" v-if="form.appendCommentType === 3">
      <div class="form-item">
        <span class="form-required">{{ item===1?'*必填':'' }}</span>
        <span class="form-label">第{{ item }}单：</span>
      </div>
      <div class="form-item">
        <span class="form-required" />
        <span class="form-label">设置照片中的商品规格：</span>
        <el-input v-model="zptpList[item-1].norm" size="small" style="width: 350px" placeholder=" 如颜色、尺寸等" />
        <div class="form-err" style="font-size: 12px"> (规格设置务必要与图片中的商品规格保持一致)</div>
      </div>
      <div class="form-item">
        <span class="form-required" />
        <span class="form-label">评价图片：</span>
        <span style="font-size: 12px;color:#bcbcbc;">（最多可添加5张图片）</span>
      </div>
      <div class="form-item">
        <span class="form-required" />
        <div style="position: relative">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            style="margin-right: 20px;background-color: #F2F2F2;"
            :before-upload="function(file) {
              return uploadImagePjtpzpChange(item-1,1)
            }"
            :http-request="uploadImagePjtpzp"
            :show-file-list="false"
          >
            <img v-if="zptpList[item-1].appendImgUrl1" :src="zptpList[item-1].appendImgUrl1" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />

          </el-upload>
          <i class="el-icon-circle-close avatar-uploader-remove" @click="zptpList[item-1].appendImgUrl1=null" />

        </div>
        <div style="position: relative">
          <el-upload
            style="margin-right: 20px;background-color: #F2F2F2"
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :before-upload="function(file) {
              return uploadImagePjtpzpChange(item-1,2)
            }"
            :http-request="uploadImagePjtpzp"
            :show-file-list="false"
          >
            <img v-if="zptpList[item-1].appendImgUrl2" :src="zptpList[item-1].appendImgUrl2" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
          <i class="el-icon-circle-close avatar-uploader-remove" @click="zptpList[item-1].appendImgUrl2=null" />

        </div>
        <div style="position: relative">
          <el-upload
            style="margin-right: 20px;background-color: #F2F2F2"
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :before-upload="function(file) {
              return uploadImagePjtpzpChange(item-1,3)
            }"
            :http-request="uploadImagePjtpzp"
            :show-file-list="false"
          >
            <img v-if="zptpList[item-1].appendImgUrl3" :src="zptpList[item-1].appendImgUrl3" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
          <i class="el-icon-circle-close avatar-uploader-remove" @click="zptpList[item-1].appendImgUrl3=null" />

        </div>
        <div style="position: relative">
          <el-upload
            style="margin-right: 20px;background-color: #F2F2F2"
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :before-upload="function(file) {
              return uploadImagePjtpzpChange(item-1,4)
            }"
            :http-request="uploadImagePjtpzp"
            :show-file-list="false"
          >
            <img v-if="zptpList[item-1].appendImgUrl4" :src="zptpList[item-1].appendImgUrl4" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
          <i class="el-icon-circle-close avatar-uploader-remove" @click="zptpList[item-1].appendImgUrl4=null" />

        </div>
        <div style="position: relative">
          <el-upload
            style="background-color: #F2F2F2"
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :before-upload="function(file) {
              return uploadImagePjtpzpChange(item-1,5)
            }"
            :http-request="uploadImagePjtpzp"
            :show-file-list="false"
          >
            <img v-if="zptpList[item-1].appendImgUrl5" :src="zptpList[item-1].appendImgUrl5" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
          <i
            class="el-icon-circle-close avatar-uploader-remove"
            style="right: -13px"
            @click="zptpList[item-1].appendImgUrl5=null"
          />

        </div>

      </div>
      <div class="form-item">
        <span class="form-required" />
        <span class="form-label">评语：</span>
        <el-input
          v-model="zptpList[item-1].appendContent"
          type="textarea"
          :rows="2"
          size="small"
          maxlength="125"
          style="width: 350px"
          placeholder=""
        />

      </div>
      <el-divider />
    </div>

    <div v-for="item in addpjzp" v-if="form.appendCommentType===4">
      <div class="form-item">
        <span class="form-required">{{ item===1?'*必填':'' }}</span>
        <span class="form-label">第{{ item }}单：</span>
      </div>
      <div class="form-item">
        <span class="form-required" />
        <span class="form-label">设置视频中的商品规格：</span>
        <el-input v-model="zpspList[item-1].norm" size="small" style="width: 350px" placeholder=" 如颜色、尺寸等" />
        <div class="form-err" style="font-size: 12px"> (规格设置务必要与视频中的商品规格保持一致)</div>
      </div>
      <div class="form-item" style="position:relative;">
        <span class="form-required" />
        <span class="form-label">选择视频：</span>
        <el-upload
          class="avatar-uploader el-upload--text"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          accept=".mp4, .avi, .wmv"
          :on-success="handleVideoSuccess"
          :before-upload="function(file) {
            beforeUploadVideo()
            return uploadImagePjspzpChange(item-1,5)
          }"
          :on-progress="uploadVideoProcess"
          :http-request="uploadImagePjspzp"
        >
          <video
            v-if="zpspList[item-1].appendVideoUrl"
            :src="zpspList[item-1].appendVideoUrl"
            class="avatar video-avatar"
            controls="controls"
            height="100px"
          >
            您的浏览器不支持视频播放
          </video>
          <el-progress
            v-if="videoFlag == true"
            type="circle"
            :percentage="videoUploadPercent"
            style="margin-top:1000px;"
          />
          <i class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
        <i class="el-icon-circle-close avatar-uploader-remove avatar-uploader-remove-class" @click="zpspList[item-1].appendVideoUrl=null" />
      </div>
      <div class="form-item">
        <span class="form-required" />
        <span class="form-label">评语：</span>
        <el-input
          v-model="zpspList[item-1].appendContent"
          type="textarea"
          :rows="2"
          maxlength="125"
          size="small"
          style="width: 350px"
          placeholder=""
        />

      </div>
      <el-divider />
    </div>

    <div class="form-item">
      <span class="form-required" />
      <span class="form-label">商品详情文字：</span>
      <el-input v-model="form.taskGoodsList[0].content" size="small" :maxlength="10" style="width: 350px" placeholder="最多10个字！" />
      <el-popover
        placement="top"
        width="550"
        trigger="hover"
      >
        <img
          style="width: 525px; height: 600px"
          :src="require('@/assets/images/spxq.png')"
          fit="fill"
        >
        <el-button slot="reference" type="text" style="position: absolute">查看示例图</el-button>
      </el-popover>
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

    <div class="step-title">第四步：筛选用户截图</div>

    <div v-for="imgItem in imgList" class="form-item">
      <span class="form-required" />
      <span class="form-label">{{ imgItem.name }}：</span>
      <el-checkbox-group v-if="imgItem.name === '搜索货比' || imgItem.name === '浏览商品'" v-model="screenshotDetails" style="display: flex;" @change="handleCheckBox">
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

    <div class="step-title">第五步：选择增值服务</div>
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
    <div class="form-item">
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
    </div>

    <!-- <div v-if="expressFlag" class="form-item">
      <span class="form-required" />
      <span class="form-label">空包服务</span>
      <span style="color: #97A8BE;margin-right: 10px">快递：</span>
      <el-select v-model="form.taskAdditionalIncrement.courierCompanyId" size="mini">
        <el-option
          v-for="item in kdList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
      <span style="width: 30px;text-align: center;color: #97A8BE">重</span>
      <el-input v-model="form.taskAdditionalIncrement.weight" size="mini" style="width: 150px">
        <template slot="append">KG</template>
      </el-input>
      <el-button style="margin-left: 20px" size="mini" type="danger" @click="delIncrement()">清 空</el-button>
    </div> -->
    <div class="step-title">第六步：填写附加要求</div>
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
  selectYwCourierCompanyList,
  selectYwTaskFeeConfig,
  uploadImageByBase64,
  getPrice
} from '@/api/shop'
import VDistpicker from 'v-distpicker'
import { uploadImage } from '@/utils'
import defaultimg from '../../../../assets/web/c.png'
import DomToImage from 'dom-to-image'

export default {
  name: 'Retbzp',
  components: { VDistpicker },
  // props: {
  //   storeType: {
  //     required: true
  //   },
  //   taskType: {
  //     required: true
  //   },
  //   store: {
  //     required: true
  //   },
  //   expressFlag: {
  //     required: true
  //   }
  // },
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
      changeTimeData: false, // 设置发送单量时间
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
      taskGoodsListimg: null,
      taskGoodsListimg1: '',
      taskGoodsListimg2: '',
      storeType: {
        required: true
      },
      taskType: {
        required: true
      },
      store: {
        required: true
      },
      expressFlag: {
        required: true
      },
      nowDateTime: '',
      taskReleaseTimeList: [{ releaseTime: null, intervalTime: 0, orderNum: 1 }], // 定义发布任务时间变量
      uploadUrl: '', // 你要上传视频到你后台的地址
      videoFlag: false, // 是否显示进度条
      videoUploadPercent: 0, // 进度条的进度，
      isShowUploadVideo: false, // 显示上传按钮
      remarkVideo: null, // 视频的获取
      remarkVideozp: null, // 视频的获取
      province: '',
      city: '',
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
          num: null,
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
        orderMessageBoard: null,
        commentType: 1,
        appendCommentType: 1,
        screenshotDetailIds: [],
        taskAdditionalIncrement: {
          toUp: 2,
          rewardAmount: null,
          weight: null,
          sex: null,
          minAge: null,
          maxAge: null,
          courierCompanyId: null,
          area: [],
          huaBei: 2,
          zuanHao: 2,
          alreadyBrowseTask: 2,
          goodsCategory: []
        },
        taskCommentList: [{ keyword: null }],
        orderRemarks: null,
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
      kdList: [],
      wzList: [{ type: 2, content: '' }],
      tpList: [{
        type: 3,
        content: '',
        norm: '',
        imgUrl1: '',
        imgUrl2: '',
        imgUrl3: '',
        imgUrl4: '',
        imgUrl5: ''
      }],
      spList: [{ type: 4, content: '', norm: '', videoUrl: '' }],
      pjtpIndex: 0,
      pjtpNum: 0,
      pjspIndex: 0,
      zpwzList: [{ appendType: 2, appendContent: '' }],
      zptpList: [{
        appendType: 3,
        appendContent: '',
        norm: '',
        appendImgUrl1: '',
        appendImgUrl2: '',
        appendImgUrl3: '',
        appendImgUrl4: '',
        appendImgUrl5: ''
      }],
      zpspList: [{ appendType: 4, appendContent: '', norm: '', appendVideoUrl: '' }],
      zppjtpIndex: 0,
      zppjtpNum: 0,
      zppjspIndex: 0,
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
    },
    addpj: function() {
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
      if (this.form.commentType === 2) {
        var length = this.wzList.length
        if (length > count) {
          this.wzList.splice(count, length - count)
        } else {
          for (var i = length; i < count; i++) {
            this.wzList.push({ type: 2, content: '' })
          }
        }
      } else if (this.form.commentType === 3) {
        var length = this.tpList.length
        if (length > count) {
          this.tpList.splice(count, length - count)
        } else {
          for (var i = length; i < count; i++) {
            this.tpList.push({
              type: 3,
              content: '',
              norm: '',
              imgUrl1: '',
              imgUrl2: '',
              imgUrl3: '',
              imgUrl4: '',
              imgUrl5: ''
            })
          }
        }
      } else if (this.form.commentType === 4) {
        var length = this.spList.length
        if (length > count) {
          this.spList.splice(count, length - count)
        } else {
          for (var i = length; i < count; i++) {
            this.spList.push({ type: 4, content: '', norm: '', videoUrl: '' })
          }
        }
      }
      return count
    },
    addpjzp: function() {
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

      if (this.form.appendCommentType === 2) {
        var length = this.zpwzList.length
        if (length > count) {
          this.zpwzList.splice(count, length - count)
        } else {
          for (var i = length; i < count; i++) {
            this.zpwzList.push({ appendType: 2, appendContent: '' })
          }
        }
      } else if (this.form.appendCommentType === 3) {
        var length = this.zptpList.length
        if (length > count) {
          this.zptpList.splice(count, length - count)
        } else {
          for (var i = length; i < count; i++) {
            this.zptpList.push({
              appendType: 3,
              appendContent: '',
              norm: '',
              appendImgUrl1: '',
              appendImgUrl2: '',
              appendImgUrl3: '',
              appendImgUrl4: '',
              appendImgUrl5: ''
            })
          }
        }
      } else if (this.form.appendCommentType === 4) {
        var length = this.zpspList.length
        if (length > count) {
          this.zpspList.splice(count, length - count)
        } else {
          for (var i = length; i < count; i++) {
            this.zpspList.push({ appendType: 4, appendContent: '', norm: '', appendVideoUrl: '' })
          }
        }
      }
      return count
    }
  },
  watch: {
    order3: {
      handler: function(val, oldval) {
        console.log(val)
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
        console.log(val)
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
        console.log(val)
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
    },
    form: {
      handler: function(val, oldval) {
        console.log(val)
        this.form.appendCommentType = val.appendCommentType
      },
      deep: true
    }
  },
  created() {
    this.init()
    this.creatData()
    this.form.storeId = this.store
    this.form.storeTypeId = this.storeType
    this.form.taskTypeId = this.taskType
    console.log('this.store' + this.store)
    console.log('this.storeType' + this.storeType)
    console.log('this.taskType' + this.taskType)
  },
  mounted() {
    this.showDate()
    this.form.storeId = this.store
    this.form.storeTypeId = this.storeType
    this.form.taskTypeId = this.taskType
  },
  methods: {
    // 改变时间内响应修改单数
    // changeValue() {
    //   var detelike = parseInt(this.hour24Data[23] ? this.hour24Data[23] : 0) +
    //                 parseInt(this.hour24Data[22] ? this.hour24Data[22] : 0) +
    //                 parseInt(this.hour24Data[21] ? this.hour24Data[21] : 0) +
    //                 parseInt(this.hour24Data[20] ? this.hour24Data[20] : 0) +
    //                 parseInt(this.hour24Data[19] ? this.hour24Data[19] : 0) +
    //                 parseInt(this.hour24Data[18] ? this.hour24Data[18] : 0) +
    //                 parseInt(this.hour24Data[17] ? this.hour24Data[17] : 0) +
    //                 parseInt(this.hour24Data[16] ? this.hour24Data[16] : 0) +
    //                 parseInt(this.hour24Data[15] ? this.hour24Data[15] : 0) +
    //                 parseInt(this.hour24Data[14] ? this.hour24Data[14] : 0) +
    //                 parseInt(this.hour24Data[13] ? this.hour24Data[13] : 0) +
    //                 parseInt(this.hour24Data[12] ? this.hour24Data[12] : 0) +
    //                 parseInt(this.hour24Data[11] ? this.hour24Data[11] : 0) +
    //                 parseInt(this.hour24Data[10] ? this.hour24Data[10] : 0) +
    //                 parseInt(this.hour24Data[9] ? this.hour24Data[9] : 0) +
    //                 parseInt(this.hour24Data[8] ? this.hour24Data[8] : 0) +
    //                 parseInt(this.hour24Data[7] ? this.hour24Data[7] : 0) +
    //                 parseInt(this.hour24Data[6] ? this.hour24Data[6] : 0) +
    //                 parseInt(this.hour24Data[5] ? this.hour24Data[5] : 0) +
    //                 parseInt(this.hour24Data[4] ? this.hour24Data[4] : 0) +
    //                 parseInt(this.hour24Data[3] ? this.hour24Data[3] : 0) +
    //                 parseInt(this.hour24Data[2] ? this.hour24Data[2] : 0) +
    //                 parseInt(this.hour24Data[1] ? this.hour24Data[1] : 0) +
    //                 parseInt(this.hour24Data[0] ? this.hour24Data[0] : 0)
    //   console.log('detelike', detelike)
    //   this.orderAll = detelike
    // },
    // 修改发布时间
    changeTime() {
      this.changeTimeData = true
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
    // 上传前的函数
    beforeUploadVideo(file) {
      console.log('上传视频进行中')
      // this.videoFlag = true
    },
    // 进度条
    uploadVideoProcess(event, file, fileList) {
      // this.videoFlag = true
      this.videoUploadPercent = file.percentage.toFixed(0) * 1
    },
    // 上传成功回调
    handleVideoSuccess(res, file) {
      this.isShowUploadVideo = true
      this.videoFlag = false
      this.videoUploadPercent = 0
      if (res.errorCode === '00') {
        this.global.company.showVideoPath = res.sprbody.urlAddress
      } else {
        this.$message.error('视频上传失败，请重新上传！')
      }
    },
    // 数组分隔
    group(array, subGroupLength) {
      const arrAy1 = []
      const arrAy2 = []
      const newArray = [arrAy1, arrAy2]
      for (var zx = 0; zx < array.length; zx++) {
        if (array[zx] < subGroupLength) {
          arrAy1.push(array[zx])
        } else if (array[zx] >= subGroupLength) {
          arrAy2.push(array[zx])
        }
      }
      return newArray
    },
    uploadImageVideo(e) {
      this.form.remarkVideo = uploadImage(e)
    },
    removeAddVideo() {
      this.form.remarkVideo = ''
    },
    uploadImageVideozp(e) {
      this.form.remarkVideozp = uploadImage(e)
    },
    removeAddVideozp() {
      this.form.remarkVideozp = ''
    },
    init() {
      var goodsdatas = {}
      goodsdatas = this.$route.query
      this.store = goodsdatas.postData.storeId
      this.storeType = goodsdatas.postData.storeTypeId
      this.taskType = goodsdatas.postData.taskTypeId

      this.form.storeId = this.store
      this.form.storeTypeId = this.storeType
      this.form.taskTypeId = this.taskType
      selectYwTaskSortWayList({ storeTypeId: this.storeType }).then(response => {
        this.sortList = response.data
        // this.form.searchSortWay = response.data[0].name
      })
      selectYwTaskScreenshotCategoryList({ taskTypeId: this.taskType }).then(response => {
        this.imgList = response.data
        // this.form.searchSortWay = response.data[0].name
      })
      selectYwGoodsCategoryList().then(response => {
        this.goodsCategoryList = response.data
        // this.form.searchSortWay = response.data[0].name
      })
      selectYwCourierCompanyList({ storeTypeId: this.storeType }).then(response => {
        this.kdList = response.data
        // this.form.searchSortWay = response.data[0].name
      })
      selectYwTaskFeeConfig().then(response => {
        this.cost = response.data
        // this.form.searchSortWay = response.data[0].name
      })
    },
    creatData() {
      console.log('this.$store.getters.reSetData', this.$store.getters.reSetData)
      var goodsdatas = {}
      goodsdatas = this.$store.getters.reSetData
      console.log('追评测试数据', goodsdatas)
      // this.form = goodsdatas.postData
      // console.log('goodsdatas', goodsdatas)
      // // console.log('goodsdatas.postData.taskGoodsList.length', goodsdatas.postData.taskGoodsList.length)
      // // 转化taskGoodsListData
      var taskGoodsListData = goodsdatas.postData.taskGoodsList

      // taskCommentListData
      var taskCommentListData = goodsdatas.postData.taskCommentList

      // taskAdditionalIncrement
      var taskAdditionalIncrementData = goodsdatas.postData.taskAdditionalIncrement

      // //  第一部分再次渲染  商品主图部分
      // console.log('postData', taskGoodsListData)
      // console.log('this.addShop.length', this.addShop.length)
      if (taskGoodsListData.length > 1) {
        this.addShop = taskGoodsListData.length
        this.form.taskGoodsList.push({
          name: null,
          content: null,
          url: null,
          img: null,
          showPrice: null,
          realPrice: null,
          payPeopleNum: null,
          num: null,
          mainFlag: 2,
          tbkFlag: 2
        })
      }
      for (var i = 0; i < taskGoodsListData.length; i++) {
        this.form.taskGoodsList[i] = taskGoodsListData[i]
      }

      // // // 第二部分
      // console.log('第二部分数据排序方式的数据', goodsdatas.postData.searchSortWay)
      this.form.searchSortWay = goodsdatas.postData.searchSortWay
      if (goodsdatas.postData.searchLocation !== '全国') {
        var provincevalue = goodsdatas.postData.searchLocation.split('|')
        this.province = provincevalue[0]
        this.city = provincevalue[1]
      }
      this.form.searchLocation = goodsdatas.postData.searchLocation
      this.form.searchMinPrice = goodsdatas.postData.searchMinPrice
      this.form.searchMaxPrice = goodsdatas.postData.searchMaxPrice
      this.form.orderMessageBoard = goodsdatas.postData.orderMessageBoard

      // // 第三部分
      // console.log('第三部分数据评论类型', taskCommentListData)
      this.form.commentType = goodsdatas.postData.commentType
      this.form.searchType = goodsdatas.postData.searchType
      if (goodsdatas.postData.params.keywordList.length > 1) {
        this.addKeyWord = goodsdatas.postData.params.keywordList.length
        this.addtkl = goodsdatas.postData.params.keywordList.length
        this.addewm = goodsdatas.postData.params.keywordList.length
        if (goodsdatas.postData.searchType === 1) {
          for (var datas = 0; datas < this.addKeyWord; datas++) {
            this.form.taskCommentList.push({ type: this.form.commentType, keyword: null })
          }
        } else if (goodsdatas.postData.searchType === 2) {
          for (var o = 0; o < this.addtkl; o++) {
            this.form.taskCommentList.push({ type: this.form.commentType, keyword: null })
          }
        } else if (goodsdatas.postData.searchType === 3) {
          for (var m = 0; m < this.addewm; m++) {
            this.form.taskCommentList.push({ type: this.form.commentType, keyword: null })
          }
        }
      }
      for (var list = 0; list < goodsdatas.postData.params.keywordList.length; list++) {
        if (goodsdatas.postData.searchType === 1 || goodsdatas.postData.searchType === 2) {
          this.form.taskCommentList[list].keyword = goodsdatas.postData.params.keywordList[list].keyword
          this.order1[list] = goodsdatas.postData.params.keywordList[list].num
          this.order2[list] = goodsdatas.postData.params.keywordList[list].num
        } else if (goodsdatas.postData.searchType === 3) {
          this.form.taskCommentList[list].qrCodeImgUrl = goodsdatas.postData.params.keywordList[list].keyword
          this.order3[list] = goodsdatas.postData.params.keywordList[list].num
        }
      }
      for (var k = 0; k < taskCommentListData.length; k++) {
        if (this.form.commentType === 1) {
          //
        } else if (this.form.commentType === 2) {
          this.wzList[k] = taskCommentListData[k]
        } else if (this.form.commentType === 3) {
          this.tpList[k] = taskCommentListData[k]
        } else if (this.form.commentType === 4) {
          this.spList[k] = taskCommentListData[k]
        }
      }
      this.form.appendCommentType = goodsdatas.postData.appendCommentType
      for (var v = 0; v < taskCommentListData.length; v++) {
        if (this.form.appendCommentType === 1) {
          //
        } else if (this.form.appendCommentType === 2) {
          this.zpwzList[v] = taskCommentListData[v]
        } else if (this.form.appendCommentType === 3) {
          this.zptpList[v] = taskCommentListData[v]
        } else if (this.form.appendCommentType === 4) {
          this.zpspList[v] = taskCommentListData[v]
        }
      }
      this.form.content = taskCommentListData.content

      this.form.releaseDate = goodsdatas.postData.releaseDate
      var arr24hListTime = []
      var arr24hListNum = []
      var provincevalueTime = []
      var provincevalueTime1 = []
      for (var arr = 0; arr < goodsdatas.postData.taskReleaseTimeList.length; arr++) {
        provincevalueTime = goodsdatas.postData.taskReleaseTimeList[arr].releaseTime.split(' ')
        provincevalueTime1 = provincevalueTime[1].split(':')
        arr24hListTime.push(provincevalueTime1[0])
        arr24hListNum.push(goodsdatas.postData.taskReleaseTimeList[arr].orderNum)
      }
      for (var times = 0; times < arr24hListTime.length; times++) {
        this.hour24Data[arr24hListTime[times]] = arr24hListNum[times]
      }
      this.orderout = goodsdatas.postData.taskReleaseTimeList.length
      this.taskReleaseTimeList = goodsdatas.postData.taskReleaseTimeList

      // // 第四部分
      // console.log('第四部分截图的数据', goodsdatas.postData.screenshotDetailIds)
      var theString = goodsdatas.postData.screenshotDetailIds
      if (theString !== null) {
        if (theString.indexOf(',') !== -1) {
          var screenshotDetailIds = theString.split(',')
          screenshotDetailIds = screenshotDetailIds.map(Number)
          screenshotDetailIds = screenshotDetailIds.sort(function(a, b) { return a - b })
          var screenshotDetailIdsData = this.group(screenshotDetailIds, 5)
          var screensData = this.group(screenshotDetailIdsData[1], 8)
          this.screenshotDetails = screenshotDetailIdsData[0].map(Number)
          var screensDatas = screensData[0].map(Number)
          screensDatas = this.ArrayPrototypeMax(screensDatas)
          this.screenshotDetails = this.ArrayPrototypeMax(this.screenshotDetails)
          this.screenshotDetails = [this.screenshotDetails, screensDatas]
          this.form.screenshotDetailIds = screensData[1].map(Number)
        }
      }

      // // 第五部分
      // console.log('第五部分类目数据', taskAdditionalIncrementData)
      // console.log('taskAdditionalIncrementData123123', taskAdditionalIncrementData.area)
      var areaData = taskAdditionalIncrementData.area
      this.form.taskAdditionalIncrement.toUp = taskAdditionalIncrementData.toUp
      this.form.taskAdditionalIncrement.rewardAmount = taskAdditionalIncrementData.rewardAmount
      this.form.taskAdditionalIncrement.sex = taskAdditionalIncrementData.sex
      this.age = taskAdditionalIncrementData.minAge + '-' + taskAdditionalIncrementData.maxAge
      if (areaData.indexOf(',') !== -1) {
        var arrArea = areaData.split(',')
        // console.log('arrArea', arrArea)

        this.form.taskAdditionalIncrement.area = arrArea
      }

      // 类目
      if (taskAdditionalIncrementData.goodsCategory.indexOf(',') !== -1) {
        var goodsCategoryData = taskAdditionalIncrementData.goodsCategory.split(',')
        goodsCategoryData = goodsCategoryData.map(Number)
        this.form.taskAdditionalIncrement.goodsCategory = goodsCategoryData
      }

      this.form.taskAdditionalIncrement.huaBei = taskAdditionalIncrementData.huaBei
      this.form.taskAdditionalIncrement.zuanHao = taskAdditionalIncrementData.zuanHao
      this.form.taskAdditionalIncrement.alreadyBrowseTask = taskAdditionalIncrementData.alreadyBrowseTask
      this.form.taskAdditionalIncrement.courierCompanyId = taskAdditionalIncrementData.courierCompanyId
      this.form.taskAdditionalIncrement.weight = taskAdditionalIncrementData.weight
      // this.form.taskAdditionalIncrement = taskAdditionalIncrementData

      // // 第六部分
      // console.log('goodsdatas', goodsdatas.postData.remarkImgUrl1)
      this.form.remarkImgUrl1 = goodsdatas.postData.remarkImgUrl1
      this.form.remarkImgUrl2 = goodsdatas.postData.remarkImgUrl2
      this.form.remarkImgUrl3 = goodsdatas.postData.remarkImgUrl3
      this.form.orderRemarks = goodsdatas.postData.orderRemarks

      // 总体
      // this.form = goodsdatas.postData
    },
    // 数组中取最大
    ArrayPrototypeMax(arr) {
      // 将数组第一个元素的值赋给max
      var max = arr[0]
      // 使用for 循环从数组第一个值开始做遍历
      for (var i = 1; i < arr.length; i++) {
        // 如果元素当前值大于max,就把这个当前值赋值给max
        if (arr[i] > max) {
          max = arr[i]
        }
      }
      // 返回最大的值
      return max
    },
    uploadImagePjtpChange(index, val) {
      this.pjtpIndex = index
      this.pjtpNum = val
    },
    uploadImagePjtp(e) {
      this.tpList[this.pjtpIndex]['imgUrl' + this.pjtpNum] = uploadImage(e)
    },
    uploadImagePjspChange(index) {
      this.pjspIndex = index
    },
    uploadImagePjsp(e) {
      this.spList[this.pjspIndex].videoUrl = uploadImage(e)
    },
    uploadImagePjtpzpChange(index, val) {
      this.zppjtpIndex = index
      this.zppjtpNum = val
    },
    uploadImagePjtpzp(e) {
      this.zptpList[this.zppjtpIndex]['appendImgUrl' + this.zppjtpNum] = uploadImage(e)
    },
    uploadImagePjspzpChange(index) {
      this.zppjspIndex = index
    },
    uploadImagePjspzp(e) {
      this.zpspList[this.zppjspIndex].appendVideoUrl = uploadImage(e)
    },
    handlePre() {
      this.$parent.handleNextOrPre(false)
    },
    uploadImage1(e) {
      this.form.taskGoodsList[this.shopIndex].img = uploadImage(e)
    },
    // 数据处理
    uploadImg(e, num, item) {
      // console.log('item', item)
      // console.log('item', e, num, item)
      // this.defaultimg = ''
      var itemData = item - 1
      var that = this
      // this.defaultimgcanvas[0].id = null
      // 上传图片
      // this.option.img
      // console.log('传参', e)
      // console.log('1zxczxc', e)
      var reader = new FileReader()
      var file = e.target.files[0]
      if (itemData === 0) {
        if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
          alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
          return false
        }
        // console.log('2')
        // console.log('上传图片，reader', reader)
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
            // console.log('上传成功123', response)
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
        // console.log('上传图片，reader', reader)
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
            // console.log('上传成功123', response)
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
        // console.log('图片大小', file)
        // 转化为base64
        // reader.readAsDataURL(file)
        // 转化为blob
        // reader.readAsArrayBuffer(file)
        // console.log('4')
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
      // console.log('3qq')
      var node = null
      var node1 = null
      var node2 = null
      const that = this
      node = this.$refs.previewImg0
      node1 = this.$refs.previewImg1
      node2 = this.$refs.previewImg2
      // console.log('4qq', node)
      DomToImage.toPng(node)
        .then(function(dataUrl) {
          // console.log('4.5qq')
          that.$nextTick(() => {
            // console.log('5qq')
            uploadImageByBase64(dataUrl).then(response => {
              // console.log('6qq')
              that.form.taskGoodsList[0].img = response.data
              // console.log('生成图片1', response.data)
            })
          })
        })
      if (itemData === 1) {
        console.log('处理1', itemData)
        DomToImage.toPng(node1)
          .then(function(dataUrl) {
            that.$nextTick(() => {
              uploadImageByBase64(dataUrl).then(response => {
                that.form.taskGoodsList[1].img = response.data
                console.log('生成图片', response.data)
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
        this.form.taskCommentList.push({ keyword: null })
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
        this.form.taskCommentList.push({ keyword: null })
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
        this.form.taskCommentList.push({ qrCodeImgUrl: null })
      }
    },
    // 改变时间内响应修改单数
    changeValue() {
      var s = 0
      for (var t = 0; t < this.taskReleaseTimeList.length; t++) {
        s += Number(this.taskReleaseTimeList[t].orderNum)
      }
      this.orderAll = s
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
    handleAddGood() {
      if (this.addShop < 3) {
        this.addShop++
        this.form.taskGoodsList.push({
          name: null,
          content: null,
          url: null,
          img: null,
          showPrice: null,
          realPrice: null,
          payPeopleNum: null,
          num: null,
          mainFlag: 2,
          tbkFlag: 2
        })
      }
    },
    handleDearchType(val) {
      this.addKeyWord = 1
      this.addtkl = 1
      this.addewm = 1
      this.order1 = []
      this.order2 = []
      this.order3 = []
      if (val === 1) {
        this.form.taskCommentList = [{ keyword: null }]
      } else if (val === 2) {
        this.form.taskCommentList = [{ keyword: null }]
      } else {
        this.form.taskCommentList = [{ qrCodeImgUrl: null }]
      }
    },
    handleReleaseDate(val) {
      this.handleChangeReleaseDate(true)
      var myDate = new Date()
      var month = myDate.getMonth() < 9 ? '0' + (myDate.getMonth() + 1) : myDate.getMonth() + 1
      var day = myDate.getDate() < 9 ? '0' + (myDate.getDate()) : myDate.getDate()
      var dataToDate = myDate.getFullYear() + '-' + month + '-' + day

      if (val === dataToDate) {
        this.hour24Show = myDate.getHours() + 1
      } else {
        this.hour24Show = 0
      }
    },
    handleNext() {
      if (this.orderAll !== this.totalSearch()) {
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

      // 截图做选项上传判断
      // console.log('单选图片', this.screenshotDetails)
      var jttpData = []
      var screenshotDetailsData = []
      var screenshotDetailsDataList = ''
      var screenshotDetailsDataList1 = ''
      if (this.screenshotDetails[0] === undefined || this.screenshotDetails[1] === undefined) {
        if (this.screenshotDetails[0] === undefined && this.screenshotDetails[1] !== undefined) {
          jttpData.push(this.screenshotDetails[1])
          this.screenshotDetails = jttpData.map(Number)
        } else if (this.screenshotDetails[1] === undefined && this.screenshotDetails[0] !== undefined) {
          jttpData.push(this.screenshotDetails[0])
          this.screenshotDetails = jttpData.map(Number)
        } else {
          this.screenshotDetails = []
        }
      }
      // console.log('单选图片', this.screenshotDetails)
      if (data.screenshotDetailIds.length > 0) {
        if (this.arrMinData.length > 0) {
          if (this.arrMaxData.length > 0) {
            // console.log('arrMinData,arrMaxDat都有', this.arrMinData, this.arrMaxData)
            data.screenshotDetailIds.splice(0, 0, this.arrMinData)
            data.screenshotDetailIds.splice(0, 0, this.arrMaxData)
            data.screenshotDetailIds = data.screenshotDetailIds.join(',')
          } else {
            // console.log('arrMinData有,arrMaxDat无', this.arrMinData, this.arrMaxData)
            data.screenshotDetailIds.splice(0, 0, this.arrMinData)
            data.screenshotDetailIds = data.screenshotDetailIds.join(',')
          }
        } else if (this.arrMinData.length === 0) {
          if (this.arrMaxData.length > 0) {
            // console.log('arrMinData无,arrMaxDat无', this.arrMinData, this.arrMaxData)
            data.screenshotDetailIds.splice(0, 0, this.arrMaxData)
            data.screenshotDetailIds = data.screenshotDetailIds.join(',')
          } else if (this.screenshotDetails.length > 0) {
            console.log('screenshotDetails', this.screenshotDetails)
            if (this.screenshotDetails[0] !== undefined) {
              screenshotDetailsData.push(this.screenshotDetails[0])
            }
            if (this.screenshotDetails[1] !== undefined) {
              screenshotDetailsData.push(this.screenshotDetails[1])
            }

            if (screenshotDetailsData[0] <= 4) {
              if (screenshotDetailsData[0] === 1) {
                screenshotDetailsDataList = 1
              } else if (screenshotDetailsData[0] === 2) {
                screenshotDetailsDataList = 1 + ',' + 2
              } else if (screenshotDetailsData[0] === 3) {
                screenshotDetailsDataList = 1 + ',' + 2 + ',' + 3
              } else if (screenshotDetailsData[0] === 4) {
                screenshotDetailsDataList = 1 + ',' + 2 + ',' + 3 + ',' + 4
              }
            } else {
              if (screenshotDetailsData[0] === 5) {
                screenshotDetailsDataList = 5
              } else if (screenshotDetailsData[0] === 6) {
                screenshotDetailsDataList = 5 + ',' + 6
              } else if (screenshotDetailsData[0] === 7) {
                screenshotDetailsDataList = 5 + ',' + 6 + ',' + 7
              }
            }
            data.screenshotDetailIds.splice(0, 0, screenshotDetailsDataList)
            if (screenshotDetailsData.length === 2) {
              if (screenshotDetailsData[1] <= 4) {
                if (screenshotDetailsData[1] === 1) {
                  screenshotDetailsDataList1 = 1
                } else if (screenshotDetailsData[1] === 2) {
                  screenshotDetailsDataList1 = 1 + ',' + 2
                } else if (screenshotDetailsData[1] === 3) {
                  screenshotDetailsDataList1 = 1 + ',' + 2 + ',' + 3
                } else if (screenshotDetailsData[1] === 4) {
                  screenshotDetailsDataList1 = 1 + ',' + 2 + ',' + 3 + ',' + 4
                }
              } else {
                if (screenshotDetailsData[1] === 5) {
                  screenshotDetailsDataList1 = 5
                } else if (screenshotDetailsData[1] === 6) {
                  screenshotDetailsDataList1 = 5 + ',' + 6
                } else if (screenshotDetailsData[1] === 7) {
                  screenshotDetailsDataList1 = 5 + ',' + 6 + ',' + 7
                }
              }
              data.screenshotDetailIds.splice(0, 0, screenshotDetailsDataList1)
            }

            data.screenshotDetailIds = data.screenshotDetailIds.join(',')
          } else {
            console.log('arrMinData,arrMaxDat都无', this.arrMinData, this.arrMaxData)
            data.screenshotDetailIds = data.screenshotDetailIds.join(',')
          }
        }
        // console.log('data.screenshotDetailIds123', data.screenshotDetailIds)
      } else if (this.arrMinData.length > 0 || this.arrMaxData.length > 0 || this.screenshotDetails.length > 0) {
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
          } else if (this.screenshotDetails.length > 0) {
            console.log('screenshotDetails', this.screenshotDetails)
            if (this.screenshotDetails[0] !== undefined) {
              screenshotDetailsData.push(this.screenshotDetails[0])
            }
            if (this.screenshotDetails[1] !== undefined) {
              screenshotDetailsData.push(this.screenshotDetails[1])
            }

            if (screenshotDetailsData[0] <= 4) {
              if (screenshotDetailsData[0] === 1) {
                screenshotDetailsDataList = 1
              } else if (screenshotDetailsData[0] === 2) {
                screenshotDetailsDataList = 1 + ',' + 2
              } else if (screenshotDetailsData[0] === 3) {
                screenshotDetailsDataList = 1 + ',' + 2 + ',' + 3
              } else if (screenshotDetailsData[0] === 4) {
                screenshotDetailsDataList = 1 + ',' + 2 + ',' + 3 + ',' + 4
              }
            } else {
              if (screenshotDetailsData[0] === 5) {
                screenshotDetailsDataList = 5
              } else if (screenshotDetailsData[0] === 6) {
                screenshotDetailsDataList = 5 + ',' + 6
              } else if (screenshotDetailsData[0] === 7) {
                screenshotDetailsDataList = 5 + ',' + 6 + ',' + 7
              }
            }
            data.screenshotDetailIds.splice(0, 0, screenshotDetailsDataList)
            if (screenshotDetailsData.length === 2) {
              if (screenshotDetailsData[1] <= 4) {
                if (screenshotDetailsData[1] === 1) {
                  screenshotDetailsDataList1 = 1
                } else if (screenshotDetailsData[1] === 2) {
                  screenshotDetailsDataList1 = 1 + ',' + 2
                } else if (screenshotDetailsData[1] === 3) {
                  screenshotDetailsDataList1 = 1 + ',' + 2 + ',' + 3
                } else if (screenshotDetailsData[1] === 4) {
                  screenshotDetailsDataList1 = 1 + ',' + 2 + ',' + 3 + ',' + 4
                }
              } else {
                if (screenshotDetailsData[1] === 5) {
                  screenshotDetailsDataList1 = 5
                } else if (screenshotDetailsData[1] === 6) {
                  screenshotDetailsDataList1 = 5 + ',' + 6
                } else if (screenshotDetailsData[1] === 7) {
                  screenshotDetailsDataList1 = 5 + ',' + 6 + ',' + 7
                }
              }
              data.screenshotDetailIds.splice(0, 0, screenshotDetailsDataList1)
            }

            data.screenshotDetailIds = data.screenshotDetailIds.join(',')
          } else {
            console.log('arrMinData,arrMaxDat都无', this.arrMinData, this.arrMaxData)
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

      var otherKey = []
      var otherKeyZp = []
      var num = null
      if (this.form.commentType === 2) {
        for (var otherKeylist = 0; otherKeylist < this.wzList.length; otherKeylist++) {
          otherKey.push({ content: this.wzList[otherKeylist].content, type: this.wzList[otherKeylist].type })
        }
      } else if (this.form.commentType === 3) {
        for (var otherKeylisttp = 0; otherKeylisttp < this.tpList.length; otherKeylisttp++) {
          otherKey.push({
            content: this.tpList[otherKeylisttp].content,
            type: this.tpList[otherKeylisttp].type,
            imgUrl1: this.tpList[otherKeylisttp].imgUrl1,
            imgUrl2: this.tpList[otherKeylisttp].imgUrl2,
            imgUrl3: this.tpList[otherKeylisttp].imgUrl3,
            imgUrl4: this.tpList[otherKeylisttp].imgUrl4,
            imgUrl5: this.tpList[otherKeylisttp].imgUrl5,
            norm: this.tpList[otherKeylisttp].norm
          })
        }
      } else if (this.form.commentType === 4) {
        for (var otherKeylistsp = 0; otherKeylistsp < this.spList.length; otherKeylistsp++) {
          otherKey.push({
            content: this.spList[otherKeylistsp].content,
            type: this.spList[otherKeylistsp].type,
            norm: this.spList[otherKeylistsp].norm,
            videoUrl: this.spList[otherKeylistsp].videoUrl
          })
        }
      }
      if (this.form.appendCommentType === 2) {
        for (var zpotherKeylistspwz = 0; zpotherKeylistspwz < this.zpwzList.length; zpotherKeylistspwz++) {
          otherKeyZp.push({ appendContent: this.zpwzList[zpotherKeylistspwz].appendContent, appendType: this.zpwzList[zpotherKeylistspwz].appendType })
        }
      } else if (this.form.appendCommentType === 3) {
        for (var zpotherKeylistsptp = 0; zpotherKeylistsptp < this.zptpList.length; zpotherKeylistsptp++) {
          otherKeyZp.push({
            appendContent: this.zptpList[zpotherKeylistsptp].appendContent,
            appendImgUrl1: this.zptpList[zpotherKeylistsptp].appendImgUrl1,
            appendImgUrl2: this.zptpList[zpotherKeylistsptp].appendImgUrl2,
            appendImgUrl3: this.zptpList[zpotherKeylistsptp].appendImgUrl3,
            appendImgUrl4: this.zptpList[zpotherKeylistsptp].appendImgUrl4,
            appendImgUrl5: this.zptpList[zpotherKeylistsptp].appendImgUrl5,
            appendType: this.zptpList[zpotherKeylistsptp].appendType,
            norm: this.zptpList[zpotherKeylistsptp].norm
          })
        }
      } else if (this.form.appendCommentType === 4) {
        for (var zpotherKeylistspsp = 0; zpotherKeylistspsp < this.zpspList.length; zpotherKeylistspsp++) {
          otherKeyZp.push({
            appendContent: this.zpspList[zpotherKeylistspsp].appendContent,
            appendType: this.zpspList[zpotherKeylistspsp].appendType,
            appendVideoUrl: this.zpspList[zpotherKeylistspsp].appendVideoUrl,
            norm: this.zpspList[zpotherKeylistspsp].norm
          })
        }
      }

      if (this.form.searchType === 1) {
        num = this.order1
      } else if (this.form.searchType === 2) {
        num = this.order2
      } else if (this.form.searchType === 3) {
        num = this.order3
      }
      data.taskCommentList = this.stitchingData(data.taskCommentList, otherKey, otherKeyZp, num)
      // var likedata = JSON.parse(data)
      // console.log('数据的格式', data)
      const bigData = {
        postData: data,
        store: this.store,
        storeType: this.storeType,
        taskType: this.taskType
      }
      this.$store.commit('SET_RESETDATA', bigData)
      data.taskAdditionalIncrement = JSON.stringify(data.taskAdditionalIncrement)
      data.taskCommentList = JSON.stringify(data.taskCommentList)
      data.taskGoodsList[0].gid = this.urltoid(data.taskGoodsList[0].url)
      if (data.taskGoodsList.length >= 2) {
        data.taskGoodsList[1].gid = this.urltoid(data.taskGoodsList[1].url)
        if (data.taskGoodsList.length === 3) {
          data.taskGoodsList[2].gid = this.urltoid(data.taskGoodsList[2].url)
        }
      }
      data.taskGoodsList = JSON.stringify(data.taskGoodsList)
      this.form.storeId = this.store
      this.form.storeTypeId = this.storeType
      this.form.taskTypeId = this.taskType
      var numId = 0
      // data.taskReleaseTimeList = JSON.stringify(data.taskReleaseTimeList)
      // 新增时间
      var taskReleasedata = this.form.taskReleaseTime
      for (var t = 0; t < this.taskReleaseTimeList.length; t++) {
        if (this.taskReleaseTimeList[t].releaseTime === '' || this.taskReleaseTimeList[t].releaseTime === null || this.taskReleaseTimeList[t].releaseTime < taskReleasedata) {
          this.taskReleaseTimeList[t].releaseTime = this.form.taskReleaseTime
        }
      }
      data.taskReleaseTimeList = JSON.stringify(this.taskReleaseTimeList)

      create(data).then(response => {
        if (response.code === 0) {
          this.handlePrice(response.data)
          numId = response.data
          const param = {
            store: this.store,
            storeType: this.storeType,
            taskType: this.taskType,
            id: numId,
            postData: data,
            type: '淘宝追评任务'
          }
          this.$router.push({ path: 'repay', query: param })
        } else {
          this.$message({
            message: response.msg,
            type: 'warning'
          })
        }
      })
    },
    set(val) {
      this.$store.commit('SET_RESETDATA', val)
    },
    handlePrice(id) {
      this.taskId = id
      getPrice({ id: id }).then(response => {
        this.priceDetail = response.data
        this.active++
      })
    },
    stitchingData(keyword, otherKey, otherKeyZp, num) {
      var data = []
      var otherkeyItem = 0
      for (var i = 0; i < keyword.length; i++) {
        for (var j = 0; j < num[i]; j++) {
          const item = {}
          if (otherKey.length > 0) {
            Object.assign(item, otherKey[otherkeyItem])
          }
          if (otherKeyZp.length > 0) {
            Object.assign(item, otherKeyZp[otherkeyItem])
          }
          Object.assign(item, keyword[i])
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
      var array = new Array()
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
        this.$message({
          message: '商品链接不正确请重新输入',
          type: 'warning'
        })
        return
      }
      //  if (e.target.value.indexOf('.taobao.com') === -1 && e.target.value.indexOf('.tmall.com') === -1) {
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
        var myDate = new Date()
        var month = myDate.getMonth() < 9 ? '0' + (myDate.getMonth() + 1) : myDate.getMonth() + 1
        var day = myDate.getDate() < 9 ? '0' + (myDate.getDate()) : myDate.getDate()
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
            }
          }
        }
        this.hour24Data = array
      }
    },
    randomArr(value, min, max, length) {
      console.log('value:====' + value + 'min:====' + min + 'max:===' + max + 'length:===' + length)
      var ran = []; var arrId
      // 循环存放数组最小值
      for (var i = 0; i < length; i++) {
        ran[i] = min
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
      console.log('ran ==========' + ran)
      return ran
    },
    clickItemAge(index) {
      index === this.age ? this.age = '' : this.age = index
      console.log(index)
    },
    clickItem(index) {
      index === this.form.taskAdditionalIncrement.sex ? this.form.taskAdditionalIncrement.sex = '' : this.form.taskAdditionalIncrement.sex = index
      console.log(index)
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

  .avatar-uploader-remove {
    position: absolute;
    top: -16px;
    right: 7px;
    color: #6666FF;
    font-size: 20px;
  }

  .avatar-uploader-remove-class {
    top: -12px;
    left: 249px;
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
  .remark {
    width: 600px;
    border-radius: 5px;
    padding: 10px;
    color: #BCBCBC;
    font-size: 12px
  }
  .avatar-uploader-remove {
    position: absolute;
    top: -16px;
    right: 7px;
    color: #6666FF;
    font-size: 20px;
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
</style>
