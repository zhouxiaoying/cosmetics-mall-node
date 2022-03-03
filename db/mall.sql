/*
Navicat MySQL Data Transfer

Source Server         : aliyun
Source Server Version : 50724
Source Host           : 47.98.133.20:3306
Source Database       : mall

Target Server Type    : MYSQL
Target Server Version : 50724
File Encoding         : 65001

Date: 2019-04-30 20:28:06
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `mall_goods`
-- ----------------------------
DROP TABLE IF EXISTS `mall_goods`;
CREATE TABLE `mall_goods` (
  `id` varchar(32) NOT NULL,
  `name` varchar(50) DEFAULT NULL COMMENT '资源类型名称',
  `price` varchar(10) DEFAULT NULL COMMENT '价格',
  `amount` varchar(10) DEFAULT NULL COMMENT '数量',
  `typeId` varchar(32) DEFAULT NULL COMMENT '种类',
  `path` varchar(100) DEFAULT NULL COMMENT '图片地址',
  `content` text COMMENT '描述',
  `status` varchar(2) DEFAULT NULL COMMENT '状态0未发布1已发布',
  `createTime` varchar(32) DEFAULT NULL COMMENT '创建时间',
  `updateTime` varchar(32) DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='物品类型';

-- ----------------------------
-- Records of mall_goods
-- ----------------------------
INSERT INTO `mall_goods` VALUES ('0d77a50dacff46fc85952f74778096c6', 'DHC美白淡斑精华液3支组', '556', '7', '6b2b223cea70467c83553f4893fcc7e5', '/upload/1f6ffa500bbbb887be062d1f151ce974.jpeg', 'DHC美白淡斑精华液3支组，DHC美白淡斑精华液3支组，DHC美白淡斑精华液3支组', '1', null, null);
INSERT INTO `mall_goods` VALUES ('ae2900bb85cc46ba96c006df8033c117', 'DHC卡姆活力晶亮化妆水2瓶组', '348', '81', '6b2b223cea70467c83553f4893fcc7e5', '', 'DHC卡姆活力晶亮化妆水2瓶组，DHC卡姆活力晶亮化妆水2瓶组，DHC卡姆活力晶亮化妆水2瓶组', '0', null, null);
INSERT INTO `mall_goods` VALUES ('b502ba7f243d47618a16663cfdb9c275', 'DHC辅酶精萃赋活眼霜2支组', '417', '6', '6b2b223cea70467c83553f4893fcc7e5', '/upload/dd6adcfdbe0c7d6bc7bb08427f0a4150.jpeg', 'DHC辅酶精萃赋活眼霜2支组，DHC辅酶精萃赋活眼霜2支组，DHC辅酶精萃赋活眼霜2支组', '1', null, null);
INSERT INTO `mall_goods` VALUES ('bcadcca62dff458e89e6cd3612c8f8a3', 'DHC弹力精萃润白霜', '568', '4', '6b2b223cea70467c83553f4893fcc7e5', '/upload/ac4a6dffd625ca78cfd2493076312133.jpeg', 'DHC弹力精萃润白霜，DHC弹力精萃润白霜，DHC弹力精萃润白霜', '1', null, null);

-- ----------------------------
-- Table structure for `mall_goods_index`
-- ----------------------------
DROP TABLE IF EXISTS `mall_goods_index`;
CREATE TABLE `mall_goods_index` (
  `id` varchar(32) NOT NULL,
  `goodId` varchar(32) DEFAULT NULL COMMENT '商品id',
  `path` varchar(100) DEFAULT NULL COMMENT '首页宣传栏大图',
  `createTime` varchar(32) DEFAULT NULL COMMENT '推荐时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of mall_goods_index
-- ----------------------------
INSERT INTO `mall_goods_index` VALUES ('167c86f331ab422db707e22b9add203c', 'bcadcca62dff458e89e6cd3612c8f8a3', '/upload/101d2ec918b49bd94e6a491b2fe80257.jpeg', '2019-4-30 20:00:15');
INSERT INTO `mall_goods_index` VALUES ('e5315f7ef0b744fb8d8b6ad7cca7bc2c', '0d77a50dacff46fc85952f74778096c6', '/upload/964afe31c04a60463d4b26934a2f2ac3.jpeg', '2019-4-30 20:00:23');

-- ----------------------------
-- Table structure for `mall_goods_recommend`
-- ----------------------------
DROP TABLE IF EXISTS `mall_goods_recommend`;
CREATE TABLE `mall_goods_recommend` (
  `id` varchar(32) NOT NULL,
  `goodId` varchar(32) DEFAULT NULL COMMENT '商品id',
  `createTime` varchar(32) DEFAULT NULL COMMENT '推荐时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of mall_goods_recommend
-- ----------------------------
INSERT INTO `mall_goods_recommend` VALUES ('44028a374b06478d8b4c990e4262d615', 'bcadcca62dff458e89e6cd3612c8f8a3', '2019-4-30 19:03:53');
INSERT INTO `mall_goods_recommend` VALUES ('473f6b9b2eee4fc698a50dbc3c749faa', '0d77a50dacff46fc85952f74778096c6', '2019-4-30 01:26:01');
INSERT INTO `mall_goods_recommend` VALUES ('6dd62a34d42e42c9ad56f2ab3bc06e5c', 'ae2900bb85cc46ba96c006df8033c117', '2019-4-30 19:04:03');
INSERT INTO `mall_goods_recommend` VALUES ('c00012cc2b0549d582904603bae11549', 'ae2900bb85cc46ba96c006df8033c117', '2019-4-30 19:03:29');

-- ----------------------------
-- Table structure for `mall_integral_goods`
-- ----------------------------
DROP TABLE IF EXISTS `mall_integral_goods`;
CREATE TABLE `mall_integral_goods` (
  `id` varchar(32) NOT NULL,
  `goodId` varchar(32) DEFAULT NULL COMMENT '可兑换积分商品id',
  `amount` varchar(10) DEFAULT NULL COMMENT '数量',
  `integralCount` varchar(10) DEFAULT NULL COMMENT '对应积分数量',
  `startTime` varchar(32) DEFAULT NULL COMMENT '开始时间',
  `endTime` varchar(32) DEFAULT NULL COMMENT '结束时间',
  `content` text COMMENT '描述',
  `useCount` varchar(10) DEFAULT NULL COMMENT '已兑换数量',
  `status` varchar(2) DEFAULT NULL COMMENT '状态0未发布1已发布',
  `createTime` varchar(32) DEFAULT NULL COMMENT '创建时间',
  `updateTime` varchar(32) DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='上架可积分兑换商品';

-- ----------------------------
-- Records of mall_integral_goods
-- ----------------------------
INSERT INTO `mall_integral_goods` VALUES ('cac01508c7074bcc8e45c4f5297d7b9c', '0d77a50dacff46fc85952f74778096c6', '11', '22', null, null, '31313', null, '1', '2019-4-30 01:25:59', null);
INSERT INTO `mall_integral_goods` VALUES ('dd39e562fb654dcbba75702ae6826e91', 'ae2900bb85cc46ba96c006df8033c117', '11', '11', null, null, '11', null, '1', '2019-4-30 20:20:13', null);

-- ----------------------------
-- Table structure for `mall_integral_order`
-- ----------------------------
DROP TABLE IF EXISTS `mall_integral_order`;
CREATE TABLE `mall_integral_order` (
  `id` varchar(32) NOT NULL,
  `integralId` varchar(32) DEFAULT NULL COMMENT '可兑换积分商品id',
  `userName` varchar(32) DEFAULT NULL COMMENT '兑换人id',
  `recordId` varchar(32) DEFAULT NULL COMMENT '记录ID',
  `createTime` varchar(32) DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='积分兑换订单';

-- ----------------------------
-- Records of mall_integral_order
-- ----------------------------
INSERT INTO `mall_integral_order` VALUES ('0be5b4bee71945a7a4edd7fa10bcc638', '0d77a50dacff46fc85952f74778096c6', 'admin', '58686945b2db4baa868f00d1352f77df', '2019-4-29 02:40:44');
INSERT INTO `mall_integral_order` VALUES ('367538effd2a4a519439b0a5338a1a7c', 'cac01508c7074bcc8e45c4f5297d7b9c', 'admin', '3d0e4f341d684e51a1848144bf5a82bd', '2019-4-30 20:26:52');
INSERT INTO `mall_integral_order` VALUES ('8160afbb46f64627adba5a432a280ef3', 'ae2900bb85cc46ba96c006df8033c117', 'admin', '6d3ea2241af94a48a87fa99c5d388667', '2019-4-29 23:15:44');
INSERT INTO `mall_integral_order` VALUES ('b9229897d26c477eb775918ce098a5b6', 'ae2900bb85cc46ba96c006df8033c117', 'admin', '04a2283212d240f28033df0d12b66921', '2019-4-29 21:44:42');

-- ----------------------------
-- Table structure for `mall_integral_record`
-- ----------------------------
DROP TABLE IF EXISTS `mall_integral_record`;
CREATE TABLE `mall_integral_record` (
  `id` varchar(32) NOT NULL,
  `count` varchar(10) DEFAULT NULL COMMENT '积分数量',
  `userName` varchar(32) DEFAULT NULL COMMENT '兑换人id',
  `status` varchar(5) DEFAULT NULL COMMENT '0获取1支出',
  `createTime` varchar(32) DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='积分获取或者支出记录表';

-- ----------------------------
-- Records of mall_integral_record
-- ----------------------------
INSERT INTO `mall_integral_record` VALUES ('04a2283212d240f28033df0d12b66921', '100', 'admin', '1', '2019-4-29 21:44:42');
INSERT INTO `mall_integral_record` VALUES ('2bf8c0b2482a48569f0e0028f32c7907', '3', 'admin', '0', '2019-4-29 01:48:55');
INSERT INTO `mall_integral_record` VALUES ('3d0e4f341d684e51a1848144bf5a82bd', '22', 'admin', '1', '2019-4-30 20:26:52');
INSERT INTO `mall_integral_record` VALUES ('3e83725c506f49db9c7e6aa28c8fb8f1', '13', 'admin', '0', '2019-4-29 22:43:10');
INSERT INTO `mall_integral_record` VALUES ('4476649ee63245b396029c11a933631c', '100', 'admin', '0', '2019-4-29 23:13:37');
INSERT INTO `mall_integral_record` VALUES ('58686945b2db4baa868f00d1352f77df', '232', 'admin', '1', '2019-4-29 02:40:44');
INSERT INTO `mall_integral_record` VALUES ('6d3ea2241af94a48a87fa99c5d388667', '232', 'admin', '1', '2019-4-29 23:15:44');
INSERT INTO `mall_integral_record` VALUES ('b771924b5ab146e98e6b677fb4119fc2', '0', 'admin', '0', '2019-4-29 02:39:46');
INSERT INTO `mall_integral_record` VALUES ('c5f8ddd6188d4a1dbb6a1669a0d3451a', '6', 'admin', '0', '2019-4-29 01:45:29');
INSERT INTO `mall_integral_record` VALUES ('e38acb7447d14298b7342d8376309c26', '70', 'admin', '0', '2019-4-29 22:42:40');
INSERT INTO `mall_integral_record` VALUES ('f1e0cd906240488491008e14c3edc922', '100', 'admin', '1', '2019-4-29 02:40:29');

-- ----------------------------
-- Table structure for `mall_order`
-- ----------------------------
DROP TABLE IF EXISTS `mall_order`;
CREATE TABLE `mall_order` (
  `id` varchar(32) NOT NULL,
  `orderNo` varchar(32) DEFAULT NULL COMMENT '订单编号',
  `totalPrice` varchar(10) DEFAULT NULL COMMENT '总价',
  `userName` varchar(32) DEFAULT NULL COMMENT '买家id',
  `status` varchar(2) DEFAULT NULL COMMENT '状态0待发货1待确认2已完成3删除',
  `createTime` varchar(32) DEFAULT NULL COMMENT '创建时间',
  `updateTime` varchar(32) DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='订单';

-- ----------------------------
-- Records of mall_order
-- ----------------------------
INSERT INTO `mall_order` VALUES ('403bcc9db954445b85c8560917d1410a', 'igtbm7gg', '6960', 'admin', '3', '2019-4-29 22:42:40', null);
INSERT INTO `mall_order` VALUES ('409038fc0bfa444ea6cd3f0edab0dbb9', 'FbTumvTA', '1280', 'admin', '3', '2019-4-29 22:43:10', null);
INSERT INTO `mall_order` VALUES ('5bd2bd3ab7d1478e88c5d195600cd1a4', 'k9qdHZMe', '1808', 'admin', '3', '2019-4-28 23:17:57', null);
INSERT INTO `mall_order` VALUES ('6f365e5915644c518ef7b59194437919', 'uEB6oMfQ', '348', 'admin', '0', '2019-4-29 01:48:55', null);
INSERT INTO `mall_order` VALUES ('77bb8c4053574e3eb59edea1a935884f', 'uTWANzxX', '0', 'admin', '3', '2019-4-29 02:39:46', null);
INSERT INTO `mall_order` VALUES ('927ae1a595c44010b27dc4b340e4f2d3', 'k9qdHZMe', '904', 'admin', '2', '2019-4-28 23:11:37', null);
INSERT INTO `mall_order` VALUES ('a3aba3f84cc44299919b7011714a3471', 'QUp8kRe6', '556', 'admin', '2', '2019-4-29 01:45:29', null);
INSERT INTO `mall_order` VALUES ('ce8ad1e887e640e0b6bc3500cb3d43c2', 'NSw65n4n', '1044', 'admin', '3', '2019-4-29 01:22:51', null);
INSERT INTO `mall_order` VALUES ('e499cf53722f44a0b158443cde652ba6', 'JNmeMZM7', '348', 'admin', '1', '2019-4-29 01:27:10', null);

-- ----------------------------
-- Table structure for `mall_order_goods`
-- ----------------------------
DROP TABLE IF EXISTS `mall_order_goods`;
CREATE TABLE `mall_order_goods` (
  `id` varchar(32) NOT NULL,
  `orderId` varchar(32) DEFAULT NULL COMMENT '订单id',
  `goodId` varchar(32) DEFAULT NULL COMMENT '商品id',
  `amount` varchar(10) DEFAULT NULL COMMENT '商品数量',
  `price` varchar(10) DEFAULT NULL COMMENT '单价',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='订单商品';

-- ----------------------------
-- Records of mall_order_goods
-- ----------------------------
INSERT INTO `mall_order_goods` VALUES ('0f1f68b927884ba5b3ec2d9301c61cb0', '403bcc9db954445b85c8560917d1410a', 'ae2900bb85cc46ba96c006df8033c117', '29', '10092');
INSERT INTO `mall_order_goods` VALUES ('38906d6f3b75402da7e30f4846c6aa96', '266c681548f54a028c2159c88cf457ca', '0d77a50dacff46fc85952f74778096c6', '7', '3892');
INSERT INTO `mall_order_goods` VALUES ('4096775f7aa846d0bc03b991b8a3ab65', '927ae1a595c44010b27dc4b340e4f2d3', 'ae2900bb85cc46ba96c006df8033c117', '1', '348');
INSERT INTO `mall_order_goods` VALUES ('56a3cfa75b024f39a9a79b30f7a6460a', '25f04fd62c87448b928a026372ba7867', '0d77a50dacff46fc85952f74778096c6', '1668', '3');
INSERT INTO `mall_order_goods` VALUES ('576bc1b6945247c59b921dd0ca86a10e', '409038fc0bfa444ea6cd3f0edab0dbb9', 'd352eaa3cad14a61ae50821517b2d590', '10', '1280');
INSERT INTO `mall_order_goods` VALUES ('598314048dac4e9b97592c4893ea767e', '5bd2bd3ab7d1478e88c5d195600cd1a4', 'ae2900bb85cc46ba96c006df8033c117', '2', '696');
INSERT INTO `mall_order_goods` VALUES ('7cabd1a5cd3c4eddbdeba565964f0bd4', '5bd2bd3ab7d1478e88c5d195600cd1a4', '0d77a50dacff46fc85952f74778096c6', '2', '1112');
INSERT INTO `mall_order_goods` VALUES ('8a048a58bc8f4b788839b68dfb1b59b0', '6f365e5915644c518ef7b59194437919', 'ae2900bb85cc46ba96c006df8033c117', '1', '348');
INSERT INTO `mall_order_goods` VALUES ('b23d04ec65a743b8b996b8d43bd507e1', 'ce8ad1e887e640e0b6bc3500cb3d43c2', 'ae2900bb85cc46ba96c006df8033c117', '3', '1044');
INSERT INTO `mall_order_goods` VALUES ('b71c6e6b68d54838a244de9653079ff2', 'e499cf53722f44a0b158443cde652ba6', 'ae2900bb85cc46ba96c006df8033c117', '1', '348');
INSERT INTO `mall_order_goods` VALUES ('c183f351c1464fda9cd58e33dca43204', '266c681548f54a028c2159c88cf457ca', 'ae2900bb85cc46ba96c006df8033c117', '2', '696');
INSERT INTO `mall_order_goods` VALUES ('d25c8c50ed5343a7bc224d356c7127f4', '25f04fd62c87448b928a026372ba7867', 'ae2900bb85cc46ba96c006df8033c117', '696', '2');
INSERT INTO `mall_order_goods` VALUES ('e287796db03e4a669c22515a5e3d564f', 'a3aba3f84cc44299919b7011714a3471', '0d77a50dacff46fc85952f74778096c6', '1', '556');
INSERT INTO `mall_order_goods` VALUES ('eae9eca37c324733b958a5757412831a', '927ae1a595c44010b27dc4b340e4f2d3', '0d77a50dacff46fc85952f74778096c6', '1', '556');
INSERT INTO `mall_order_goods` VALUES ('fb09a4fb702c45fe954825b3f5822682', 'ce8ad1e887e640e0b6bc3500cb3d43c2', '0d77a50dacff46fc85952f74778096c6', '2', '1112');

-- ----------------------------
-- Table structure for `mall_type`
-- ----------------------------
DROP TABLE IF EXISTS `mall_type`;
CREATE TABLE `mall_type` (
  `id` varchar(32) NOT NULL,
  `name` varchar(50) DEFAULT NULL COMMENT '资源类型名称',
  `parent_id` varchar(32) DEFAULT NULL COMMENT '父级id',
  `status` varchar(5) DEFAULT NULL COMMENT '状态0下架1发布',
  `level` varchar(5) DEFAULT '1' COMMENT '级别',
  `operator` varchar(32) DEFAULT NULL COMMENT '创建人',
  `createTime` varchar(32) DEFAULT NULL COMMENT '创建时间',
  `updateTime` varchar(32) DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='资源分类表';

-- ----------------------------
-- Records of mall_type
-- ----------------------------
INSERT INTO `mall_type` VALUES ('3955cbf4d1134899b6dfbd08d2b4c588', '测试子类', '6d2287898fde4e9fbd335d3b79b26e87', '1', '2', null, null, '2019-4-30 20:22:54');
INSERT INTO `mall_type` VALUES ('6b2b223cea70467c83553f4893fcc7e5', '测试1234', '6c8b787eea5b42eaa9959bf6dc76d443', '1', '2', null, null, '2019-4-30 18:09:27');
INSERT INTO `mall_type` VALUES ('6c8b787eea5b42eaa9959bf6dc76d443', '男装2', null, '1', '1', null, null, '2019-4-30 18:09:15');
INSERT INTO `mall_type` VALUES ('6d2287898fde4e9fbd335d3b79b26e87', '测试', null, '1', '1', null, null, '2019-4-30 20:23:02');
INSERT INTO `mall_type` VALUES ('f52f34af1dc64a979f44dc38fe9cc7df', '测试0417', '6c8b787eea5b42eaa9959bf6dc76d443', '1', '2', null, null, '2019-4-30 18:09:25');

-- ----------------------------
-- Table structure for `mall_user`
-- ----------------------------
DROP TABLE IF EXISTS `mall_user`;
CREATE TABLE `mall_user` (
  `id` varchar(32) NOT NULL COMMENT '主键id',
  `userName` varchar(50) DEFAULT NULL COMMENT '登录账号',
  `name` varchar(50) DEFAULT NULL COMMENT '用户名',
  `sex` varchar(5) DEFAULT NULL COMMENT '性别0男1女',
  `phone` varchar(32) DEFAULT NULL COMMENT '手机号',
  `role` varchar(5) DEFAULT NULL COMMENT '角色0普通用户1管理员',
  `password` varchar(50) DEFAULT NULL,
  `createTime` varchar(32) DEFAULT NULL COMMENT '创建时间',
  `updateTime` varchar(32) DEFAULT NULL COMMENT '更新时间',
  `integral` varchar(10) DEFAULT NULL COMMENT '积分总量',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户表';

-- ----------------------------
-- Records of mall_user
-- ----------------------------
INSERT INTO `mall_user` VALUES ('0000000002', 'admin', '管理员12', '1', '132123456789', '1', '1234567', null, '2019-4-14 15:23:53', '29297');
INSERT INTO `mall_user` VALUES ('0000000003', 'zxy12345', '', '1', '123456', '0', '123456', null, '2019-4-14 15:24:52', null);
INSERT INTO `mall_user` VALUES ('3', 'zxy12345789', null, '0', null, '0', '123456', null, null, null);
INSERT INTO `mall_user` VALUES ('305022c6f352430585fb2f5301c2d82c', 'test2', '', '0', '123456', '0', '123456', null, null, null);
INSERT INTO `mall_user` VALUES ('5af3f3e340234956a2e8564bd4665b5e', 'test11', '测试', '1', '123456789', '1', '123456', null, null, null);
INSERT INTO `mall_user` VALUES ('8381d6a53602490bb2bfc5b05ddfa4b7', '123456', '123456', '1', '123456', '0', '123456', null, null, null);
INSERT INTO `mall_user` VALUES ('aa7d7263dcab484cb90c51d672c61c66', 'test3', '', '1', '1234567', '0', '123456', null, null, null);
INSERT INTO `mall_user` VALUES ('b2afe6b8b52d45d0b7333fe09617e84d', '1234567', '', '0', '', '0', '123456', null, null, null);
INSERT INTO `mall_user` VALUES ('b5071bf67ed1454f9e8d66689166430e', 'test', '', '0', '', '0', '123456', null, null, null);
INSERT INTO `mall_user` VALUES ('c014d84476df4968a76faf39eeac383d', 'zxy0419', 'zxy0419', '1', '123456', '0', '123456', null, null, null);
INSERT INTO `mall_user` VALUES ('d3f65fd3c6114f24aed5e8991c3cf1a9', 'zxy041901', 'zxy041901', '0', '111111', '0', '123456', null, '2019-4-19 21:08:32', null);
INSERT INTO `mall_user` VALUES ('dcb0e63896554de5ba7ed3fb60a365b1', 'zxcasdqwe', null, '0', null, '0', '123456', null, null, null);
INSERT INTO `mall_user` VALUES ('e410a0ffa368427a939836d43cab401e', 'test4', '测试', '1', '1234567', '1', '123456', null, null, null);
INSERT INTO `mall_user` VALUES ('ed6ef70b21084d74b09ab394008e2db5', 'zxy12345789asdqwezxc', null, '0', null, '0', '123456', null, null, null);
