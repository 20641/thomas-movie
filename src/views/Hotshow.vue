<template>
    <transition name="move">
        <div class="Hotshow">
            <ul>
                <li
                    v-for="(movie, index) in movieList"
                    :key="movie.index"
                    @click="movie_detail(movie.id)"
                >
                    <div class="movie_wrapper">
                        <img v-lazy="picFix(movie.img)" alt>
                        <div class="movie_detail">
                            <div class="title_name">
                                <h1 class="title textOverflow1">{{movie.nm}}</h1>
                                <span
                                    class="icon"
                                    v-if="movie.version =='v3d imax'"
                                    :class="{'active1': movie.version =='v3d imax'}"
                                ></span>
                                <span
                                    v-else
                                    class="icon"
                                    :class="{'active2': movie.version =='v2d imax'}"
                                ></span>
                            </div>
                            <p class="evaluate" v-if="movie.sc > 0 && movie.preShow">
                                观众评:
                                <span>{{movie.sc}}</span>
                            </p>
                            <p class="evaluate" v-else-if="movie.sc == 0">暂无评分</p>
                            <p class="evaluate" v-else>
                                <span>{{movie.wish}}</span>人想看
                            </p>
                            <h5 class="people textOverflow1">主演:{{movie.star}}</h5>
                            <h6 class="show textOverflow1">{{movie.showInfo}}</h6>
                        </div>
                    </div>
                    <!-- 购票预售组件 -->
                    <div class="btn">
                        <my-button :title="title" :movieList="movieList" :index="index"></my-button>
                    </div>
                </li>
            </ul>
            <!-- loading 加载组件 -->
            <div class="loading" v-show="coming.length">
                <mt-spinner color="rgb(100, 100, 100)" type="fading-circle"></mt-spinner>
            </div>
        </div>
    </transition>
</template>

<script>
// @ is an alias to /src
import myButton from "@/components/myButton.vue";
export default {
    name: "Hotshow",
    created() {
        let that = this;
        this.axios.get("/ajax/movieOnInfoList").then(res => {
            this.movieList = res.data.movieList;
            this.movieIds = res.data.movieIds;
            document.addEventListener(
                "scroll",
                this.fangdou(function() {
                    that.getMoreInfo(this.movieIds);
                }, 500)
            );
        });
        this.$store.commit("changeHt", "Thomas-movie");
    },
    data() {
        return {
            movieList: [],
            title: ["购票", "预售"],
            movieIds: [],
            coming: []
        };
    },
    methods: {
        picFix(wh) {
            if (wh !== undefined) {
                return wh.replace("w.h", "64.90");
            }
        },
        movie_detail(id) {
            this.$router.push({
                name: "movie_detail",
                params: {
                    movieId: id
                }
            });
        },
        fangdou(callback, delay) {
            var timer;
            return function() {
                if (timer) {
                    clearTimeout(timer);
                }
                timer = setTimeout(() => {
                    callback.apply(this, arguments);
                }, delay);
            };
        },
        getMoreInfo(movieIds) {
            var flag = true;
            var that = this;
            var scrollTop = document.documentElement.scrollTop;
            var pageHeight = document.documentElement.scrollHeight;
            var windowHeight = window.innerHeight;
            if (scrollTop + pageHeight == windowHeight && flag == true) {
                flag = false;
            }
            let arrindex = 12; 
            let limit = 12; 
            let tosee = that.movieIds.splice(arrindex, limit);
            tosee = tosee.join(",");
            that.axios
                .get("/ajax/moreComingList", {
                    params: {
                        token: "",
                        movieIds: tosee
                    }
                })
                .then(res => {
                    that.coming = res.data.coming;
                    if (res.data.coming.length !== 0) {
                        that.movieList = that.movieList.concat(res.data.coming);
                    } else {
                        return false;
                    }
                });
            this.$forceUpdate(); 
        }
    },
    components: {
        myButton
    }
};
</script>

<style lang="scss" scoped>
@import "@/assets/sass/now_hot.scss";
@import "@/assets/sass/public.scss";
.move-enter {
    transform: translateY(50px);
    opacity: 0;
}
.move-enter-active {
    transition: all 0.8s;
}
.loading {
    position: absolute;
    left: 50%;
    // bottom: -20px;
    transform: translateX(-50%);
}
</style>
