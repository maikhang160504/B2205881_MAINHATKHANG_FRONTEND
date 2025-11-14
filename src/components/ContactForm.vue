<template>
    <Form @submit="submitContact" :validation-schema="contactFormSchema">
        <div class="form-group">
            <label for="name">Tên</label>
            <Field id="name" name="name" type="text" class="form-control" v-model="contactLocal.name" />
            <ErrorMessage name="name" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="email">Email</label>
            <Field id="email" name="email" type="email" class="form-control" v-model="contactLocal.email" />
            <ErrorMessage name="email" class="error-feedback" />
        </div>

        <div class="form-group">
            <label for="address">Địa chỉ</label>
            <Field id="address" name="address" type="text" class="form-control" v-model="contactLocal.address" />
            <ErrorMessage name="address" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="phone">Điện thoại</label>
            <Field id="phone" name="phone" type="tel" class="form-control" v-model="contactLocal.phone" />
            <ErrorMessage name="phone" class="error-feedback" />
        </div>
        <div class="form-group form-check">
            <input type="checkbox" name="favorite" class="form-check-input" v-model="contactLocal.favorite" />
            <label for="favorite" class="form-check-label">Liên hệ yêu thích</label>
        </div>
        <div class="form-group">
            <button class="btn btn-primary">Lưu</button>
            <button v-if="contactLocal._id" type="button" class="ml-2 btn btn-danger" @click="deleteContact">
                Xóa
            </button>
            <button type="button" class="ml-2 btn btn-secondary" @click="Cancel">Thoát</button>
        </div>
    </Form>
</template>
<script>
import * as yup from 'yup';
import { Form, Field, ErrorMessage } from 'vee-validate';
export default {
    components: {
        Form,
        Field,
        ErrorMessage
    },
    emits: ["submit:contact", "delete:contact"],
    props: {
        contact: { type: Object, required: true }
    },
    data() {
        const contactFormSchema = yup.object().shape({
            name: yup
                .string()
                .required("Tên phải có giá trị.")
                .min(2, "Tên phải trên 2 ky tự.")
                .max(50, "Name phải nhỏ hơn 50 ky tự."),
            email: yup
                .string()
                .email("Email không hợp lý.")
                .max(50, "Email phải nhỏ hơn 50 ky tự."),
            address: yup.string().max(100, "Địa chỉ phải nhỏ hơn 100 ky tự."),
            phone: yup
                .string()
                .matches(
                    /((09|03|07|08|05)+([0-9]{8})\b)/g,
                    "So dien thoai khong hop le"
                )
        });
        return {
            contactLocal: this.contact,
            contactFormSchema
        }
    },
    methods: {
        submitContact() {
            this.$emit("submit:contact", this.contactLocal);
        },
        deleteContact() {
            this.$emit("delete:contact", this.contactLocal.id);
        },
        Cancel() {
            const reply = window.confirm("You have unsaved changes. Are you sure you want to leave?");
            if (!reply)
                return false;
            else this.$router.push({ name: "contactbook" });
        }
    }
}
</script>
<style scoped>
@import "@/assets/form.css";
</style>