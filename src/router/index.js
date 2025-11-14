import { createWebHistory, createRouter } from "vue-router";
import ContactBook from "@/views/ContactBook.vue";

const routes = [
  {
    path : "/",
    name : "contactbook",
    component : ContactBook
  },
  {
    path : "/contact/:id",
    name : "contact.edit",
    component : () => import("@/views/ContactEdit.vue"),
    props : true
  },
  {
    path : "/contact/create",
    name : "contact.create",
    component : () => import("@/views/CreateContact.vue")
  },
  {
    path : "/:pathMatch(.*)*",
    name : "notfound",
    component: () => import("@/views/NotFound.vue")
  }
];

const router = createRouter({
  history : createWebHistory( import.meta.env.BASE_URL),
  routes,
});

export default router;