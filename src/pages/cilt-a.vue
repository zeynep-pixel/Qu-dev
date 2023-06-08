<template>
  <q-layout
    ><div class="q-gutter-sm" id="breadcrumbs">
      <q-breadcrumbs>
        <q-breadcrumbs-el label="Anasayfa" to="/" />
        <q-breadcrumbs-el label="Tüm Cilt Bakım Ürünleri" to="/cilt-a" />
      </q-breadcrumbs>
    </div>
    <div>
      <p class="q-pt-lg" id="title">Tüm Cilt Bakım Ürünleri</p>
    </div>
    <div class="row q-pl-lg" id="mainrow">
      <div
        id="roww"
        style="height: 750px; width: 350px"
        v-for="task in tasks"
        :key="task.id"
      >
        <div>
          <q-img :src="task.src" style="height: 350px; width: 325px"></q-img>
        </div>
        <div>
          <p
            class="text-center q-pt-md"
            style="height: 80px; width: 300px"
            id="productname"
          >
            {{ task.title }}
          </p>
        </div>
        <div class="q-pt-xl" id="icons">
          <q-img
            style="height: 70px; width: 70px"
            src="https://thepurestsolutions.com/media/icons/alcoholFree.png"
          ></q-img>
          <q-img
            style="height: 70px; width: 70px"
            src="https://thepurestsolutions.com/media/icons/paraben.png"
          ></q-img>
          <q-img
            style="height: 70px; width: 70px"
            src="https://thepurestsolutions.com/media/icons/vegan.png"
          ></q-img>
        </div>
        <div class="row">
          <p class="q-pt-md" id="productprice">{{ task.price }}</p>
          <a class="q-pt-md q-pl-sm" href="https://www.w3schools.com">Yorum</a>
          <q-rating
            id="rating"
            v-model="ratingModel"
            size="13px"
            :max="5"
            color="black"
          />
        </div>
        <div class="row" id="buttons">
          <q-item clickable style="height: 10px; width: 140px" id="ürün">
            Ürüne Git
          </q-item>
          <div style="height: 10px; width: 5px"></div>
          <q-item
            clickable
            style="height: 10px; width: 140px; color: white"
            id="sepete"
          >
            Sepete Git</q-item
          >
        </div>
      </div>
    </div>
  </q-layout>
</template>

<style lang="scss">
a {
  color: black;
  font-size: 7 px;
}
#breadcrumbs {
  padding-top: 125px;
  padding-left: 50px;
  font-size: 15px;
  color: #435364;
}
#title {
  padding-left: 50px;
  font-size: 25px;
  color: #435364;
}

#roww {
  padding-top: 15px;
  padding-left: 60px;
  background-size: 350px 350px;
}
#productname {
  padding-left: 20px;
  font-size: 17px;
  color: #435364;
}
#productprice {
  padding-left: 15px;
  font-size: 17px;
  color: #435364;
}
#icons {
  padding-left: 50px;
}

#rating {
  padding-left: 80px;
}
#buttons {
  padding-left: 5px;
}
#sepete {
  background-color: #435364;
  padding-top: 13px;
  padding-left: 35px;
  border-radius: 2px;
}
#ürün {
  border-style: solid;
  border-color: grey;
  border-width: 1px;
  padding-top: 13px;
  padding-left: 35px;
  border-radius: 2px;
}
</style>

<script>
import { defineComponent } from "vue";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
  addDoc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";

export default defineComponent({
  name: "cilt-a",
  setup() {},
  data() {
    return {
      loading: false,
      updating: [],
      newTask: "",
      tasks: [],
      checked: true,
      tasksColRef: "Tasks",
      unsub: {},
    };
  },
  async created() {
    await this.getTasks();
    this.updating = new Array(this.tasks.length).fill(false);
    const tasks = this.tasks;
    this.unsub = onSnapshot(
      doc(this.$db, this.tasksColRef, this.tasks[0].id),
      (doc) => {
        tasks[0] = { ...doc.data(), id: tasks[0].id };
        console.log("Current data: ", doc.data());
      }
    );
  },
  methods: {
    async getTasks() {
      this.loading = true;
      this.tasks = [];

      const q = query(collection(this.$db, "Tasks"));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((todo) => {
        console.log({ ...todo.data(), id: todo.id });
        this.tasks.push({ ...todo.data(), id: todo.id });
      });

      this.loading = false;
    },
  },
});
</script>
