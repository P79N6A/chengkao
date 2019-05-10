<template>
  <div class="i-home">
    <iframe name="h" class="i-h"></iframe>
    <form class="i-search" action="s" target="h">
      <div class="in">
        <input class="q" name="q" maxlength="100" autocorrect="off" x-webkit-speech="" v-model="query" ref="q">
        <button @click="reset" class="close" type="reset" v-if="query">x</button>
        <button class="search-button">搜索</button>
      </div>
    </form>

    <div class="i-suggest" v-show="showSuggest">
      <ul>
        <li v-for="item of suggestList" @click="addQ($event)">{{item.text}}</li>
      </ul>
      <div class="i-sugges-control">
        <div class="i-sugges-close" @click="showSuggest = false">关闭</div>
      </div>
    </div>

    <div class="i-slector">
      {{title}} <span class="total">收录 {{answer.length}} 道题</span>
      <select v-model="xueke">
        <template v-for="item of map">
          <option :value="item.value">{{item.title}}</option>
        </template>
      </select>
    </div>

    <div class="i-answers">
      <template v-for="(item, index) of filter(answer, query)">
        <div class="item" @click="toggle($event, item.index)">
          <div class="">
            <span class="index">{{item.index}}</span> <span v-html="item.text"></span>
          </div>
          <div class="more" v-if="item.showMore">
            <template v-for="(p, j) of Array(20)">
              <div v-if="answer[item.index + j + 1]">
                {{answer[item.index + j + 1].text}}<br>
              </div>
            </template>
          </div>
        </div>
      </template>

      <div class="item" v-if="query">
        找不到答案？ 试试
        <a :href="'//m.so.com/s?q=' +encode(query)+ '&src=haozi_me'" target="_blank">360搜索</a> &nbsp;
        <a :href="'//www.baidu.com/s?ie=utf-8&wd=' + encode(query)" target="_blank">百度搜索</a>
        <a :href="'http://s.ppkao.com/cse/search?q=' + encode(query) + '&click=1&s=7348154799869824824&nsid='" target="_blank">考试资料</a>

      </div>
    </div>

    <button class="i-gotop" @click="gotop"></button>
  </div>
</template>

<script>
  // import guanliAnliFenxiRaw from '../data/guanliAnliFenxi'
  // import jinrongxueRaw from '../data/jinrongxue'
  // import liutongGailunRaw from '../data/liutongGailun'
  // import minzuLilunRaw from '../data/minzuLilun'
  // import qiyeZhanlveGuanliRaw from '../data/qiyeZhanlveGuanli'
  // import xiaoqiyeGuanliRaw from '../data/xiaoqiyeGuanli'
  // import renliZiyuanRaw from '../data/renliZiyuanGuanli'
  // import zhengquanTouziFenxiRaw from '../data/zhengquanTouziFenxi'
  import englishRaw from '../data/english'
  import computerRaw from '../data/computer'

  import Storage from '../lib/storage'
  const storage = new Storage()

  const anwsers = {
    english: parse(englishRaw),
    computer: parse(computerRaw)
    // guanliAnliFenxi: parse(guanliAnliFenxiRaw),
    // jinrongxue: parse(jinrongxueRaw),
    // liutongGailun: parse(liutongGailunRaw),
    // minzuLilun: parse(minzuLilunRaw),
    // qiyeZhanlveGuanli: parse(qiyeZhanlveGuanliRaw),
    // xiaoqiyeGuanli: parse(xiaoqiyeGuanliRaw),
    // renliZiyuanGuanli: parse(renliZiyuanRaw),
    // zhengquanTouziFenxi: parse(zhengquanTouziFenxiRaw)
  }

  const map = [
    {
      value: 'english',
      title: '英语'
    },
    {
      value: 'computer',
      title: '计算机'
    }
    // {
    //   value: 'guanliAnliFenxi',
    //   title: '管理案例分析'
    // },
    // {
    //   value: 'jinrongxue',
    //   title: '金融学'
    // },
    // {
    //   value: 'liutongGailun',
    //   title: '流通概论'
    // },
    // {
    //   value: 'minzuLilun',
    //   title: '民族理论'
    // },
    // {
    //   value: 'qiyeZhanlveGuanli',
    //   title: '企业战略管理'
    // },
    // {
    //   value: 'xiaoqiyeGuanli',
    //   title: '小企业管理'
    // },
    // {
    //   value: 'renliZiyuanGuanli',
    //   title: '人力资源管理'
    // },
    // {
    //   value: 'zhengquanTouziFenxi',
    //   title: '证券投资分析'
    // }
  ]

  export default {
    name: 'Home',
    data() {
      return {
        answer: [],
        query: '',
        xueke: storage.get('lastXueke') || 'english',
        map,
        history: storage.get('history') || [],
        showSuggest: false
      }
    },

    mounted() {
      this.answer = anwsers[this.xueke]
    },

    watch: {
      xueke(newVal) {
        this.answer = anwsers[newVal]
        storage.set('lastXueke', newVal)
      },

      query(text) {
        text = text.trim()
        if (!text || text.length === 1) return
        this.showSuggest = true
        let isRepeat
        for (let item of this.history) {
          if (item.text === text) {
            isRepeat = true
            break
          }
        }
        if (isRepeat) return
        this.history.unshift({text})
      },

      history(newVal) {
        storage.set('history', newVal.slice(0, 100))
      },

      suggestList(newVal) {
        if (newVal.length === 0) {
          this.showSuggest = false
        } else {
          this.showSuggest = true
        }
      }
    },

    methods: {
      encode: s => encodeURIComponent(s),

      filter(answer, query) {
        query = query.trim()
        if (!query) return answer.slice(0, 1)
        if (query === 'all') return answer
        let reg = new RegExp(query, 'ig')
        return answer
          .filter(item => item.text.indexOf(query) > -1)
          .sort((a, b) => a.text.indexOf(query) - b.text.indexOf(query))
          .map(item => {
            const text = item.text.replace(reg, '<em>$&</em>')
            return {
              ...item,
              text
            }
          })
      },

      toggle(e, index) {
        this.answer[index].showMore = !this.answer[index].showMore
        this.$nextTick(() => {
          e.target.scrollIntoView()
        })
      },

      gotop() {
        setTimeout(() => {
          window.scrollTo(0, 0)
        })
      },

      reset() {
        this.query = ''
        this.$refs.q.focus()
      },

      addQ(e) {
        this.query = e.target.innerText.trim()
        this.$refs.q.focus()
        this.showSuggest = false
      }
    },

    computed: {
      title() {
        let title = map.filter(item => item.value === this.xueke)[0].title
        return title
      },

      suggestList() {
        if (!this.query) return []
        try {
          return this.history.filter(item => item.text.indexOf(this.query) > -1 && item.text !== this.query).slice(0, 5)
        } catch (e) {
          return []
        }
      }
    }
  }

  function parse(raw) {
    return raw.split('\n')
      .map(item => String(item).trim())
      .filter(Boolean)
      .map((text, index) => {
        return {
          index,
          text,
          showMore: false
        }
      })
  }
</script>

<style lang="less">
  html {
    background: #eee;
  }

  .i-home {
  }
  .i-h {
    display: none;
  }

  .i-slector {
    height: 30px;
    overflow: hidden;
    line-height: 30px;
    background: #fff;
    text-align: center;
    margin-top: 5px;
    display: block;
    font-size: 18px;
    position: relative;
    .total {
      font-size: 12px;
      color: #999
    }
    select {
      opacity: 0;
      height: 100%;
      width: 100%;
      text-align: center;
      position: absolute;
      top:0;
      left:0;
      right:0;
    }
  }

  .i-search {
    background: #fff;
    padding:5px 10px;
    .env-weixin & {
      padding-top: 50px;
    }
    .in{
      position: relative;
      -webkit-appearance: none;
      background: none;
      border: 1px solid #00be3c;
    }
    .q {
      border-radius: 0;
      -webkit-border-radius: 0;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      display: block;
      font-size: 18px;
      font-family: 'Microsoft YaHei',Hei,arial,sans-serif;
      height: 100%;
      line-height: 30px;
      outline: 0;
      overflow: hidden;
      padding:10px 4px;
      resize: none;
      vertical-align: middle;
      width: 100%;
      word-break: break-all;
      border: none;
    }
    .close {
      position: absolute;
      width: 40px;
      right: 60px;
      top: 0;
      bottom:0;
      font-size: 18px;
      background: none;
    }
    .search-button{
      -webkit-appearance: none;
      background: #19b955;
      position: absolute;
      right:0;
      top:0;
      bottom:0;
      width: 60px;
      color: #fff;
      font-size: 14px;
      border: none;
      outline: none;
    }
  }

  .i-suggest {
    background: #fff;
    z-index: 99;
    top: 40px;
    margin: -5px 0 5px 0;
    left: 0;
    right: 0;
    padding-bottom: 5px;
    ul {
      margin: 0 10px;
      border: 1px solid #ccc;
    }
    li {
      font-size: 14px;
      border-bottom: 1px solid #eee;
      &:last-of-type{
        border: none;
      }
      height: 30px;
      line-height: 30px;
      padding: 0 10px;
    }
    .i-sugges-control{
      display: flex;
      font-size: 14px;
      justify-content: flex-end;
      border: 1px solid #ccc;
      margin: 0 10px;
      border-top: none;
    }
    .i-sugges-close{
      padding: 5px 15px;
    }
  }

  .i-answers {
    padding: 5px;
    .item {
      background-color: #fff;
      margin: 6px 0 0;
      padding: 15px 15px 13px;
      font-size: 14px;
    }
    .index {
      background: #ddd;
      border-radius: 3px;
      padding: 0 5px;
      font-size: 12px;
      color:#fff;
    }
    .more{
      padding: 3px;
      font-size: 12px;
      color:#999;
    }
    em {
      background: orange;
      font-style: normal;
      padding: auto 5px;
    }
  }

  .i-gotop {
    background-image: url(../assets/gotop.png);
    background-size: 100% 100%;
    height: 50px;
    width: 50px;
    bottom: 5px;
    padding: 15px;
    position: fixed;
    right: 5px;
    z-index: 1000;
    border: 1px solid #eee;
    text-align: center;
    line-height: 36px;
  }

</style>
