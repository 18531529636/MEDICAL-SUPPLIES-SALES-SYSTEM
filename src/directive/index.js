import directives from './directive';

const MyDirective = Object.create(null);

MyDirective.install = (Vue) => {
  Object.keys(directives).forEach((key) => {
    Vue.directive(key, directives[key]);
  });
};

export default MyDirective;
