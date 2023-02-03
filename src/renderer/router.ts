import * as VueRouter from "vue-router";

export let router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes: [
    { path: "/", redirect: "/WindowMain/List" },
    {
      path: "/WindowMain",
      component: () => import("./Window/WindowMain.vue"),
      children: [
        { path: "List", component: () => import("./Window/WindowMain/List.vue") },
      ],
    },
    {
      path: "/:catchAll(.*)",
      redirect: "/WindowMain/List"
    }
  ],
});
