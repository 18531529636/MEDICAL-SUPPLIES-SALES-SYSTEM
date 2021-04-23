import Vue from 'vue';
import {
  Button,
  Layout,
  Cascader,
  Menu,
  Carousel,
  Table,
  Radio,
  Icon,
  Tag,
  Input,
  Message,
  Descriptions,
  Select,
} from 'ant-design-vue';

Vue.use(Button);
Vue.use(Layout);
Vue.use(Cascader);
Vue.use(Menu);
Vue.use(Carousel);
Vue.use(Table);
Vue.use(Radio);
Vue.use(Icon);
Vue.use(Tag);
Vue.use(Input);
Vue.use(Message);
Vue.use(Descriptions);
Vue.use(Select);

Vue.prototype.$message = Message;
