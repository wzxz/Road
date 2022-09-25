import { defineStore } from "pinia";
interface Return {
  data: Data[];
  line: Line[];
}
/* 

TODO:
  添加是否选中字段
  删除方法
*/
interface Data {
  id: string; // 图形id
  type: DataType; // 图形类型（圆、菱）
  txt: string; // 文字
  isCheck: boolean; // 是否选中
  father: string[]; // 父级id
  son: string[]; // 子级id
  coordinate: {
    core: XY; // 图形的中心点
    top: XY; // 上圆点坐标
    right: XY; // 右
    bottom: XY; // 下
    left: XY; // 左
  };
}

export interface Line {
  id: string; // 线id
  isCheck: boolean; // 是否选中
  fatherId: string; // 父级id
  sonId: string; // 子级id
  start: CoordinateInfo; // 开始坐标点信息
  end: CoordinateInfo; // 结束坐标点信息
  color: string; // 线的颜色
}

// 图形类型
export type DataType = "round" | "diamond";

// 坐标信息
export interface CoordinateInfo {
  xy: XY; // 坐标点
  type: Direction; // 方向
}

export default defineStore("data", {
  //! 数据
  state: (): Return => ({
    data: [
      {
        id: "001",
        txt: "11",
        type: "round",
        father: [], // 父级
        // 子级
        son: ["002"],
        coordinate: {},
      },
      {
        id: "002",
        txt: "22",
        type: "diamond",
        son: [],
        father: [],
        coordinate: {
          core: [0, 0],
        },
      },
      {
        id: "003",
        txt: "33",
        type: "round",
        son: [],
        father: [],
        coordinate: {
          core: [0, 0],
        },
      },
    ],
    line: [
      {
        fatherId: "001",
        sonId: "002",
        start: { xy: [102, 49], type: "right" },
        end: { xy: [167, 117], type: "top" },
        id: "1663480310334",
        color: "#000",
      },
    ],
  }),

  //! 计算属性
  getters: {},

  //! 方法
  actions: {
    // 修改图形坐标点
    addGraphicalXY(id: string, xy: XY) {
      this.data.forEach((item) => {
        if (item.id === id) {
          const x = xy[0];
          const y = xy[1];
          const top: XY = [x, y - 50];
          const right: XY = [x + 50, y];
          const bottom: XY = [x, y + 50];
          const left: XY = [x - 50, y];
          item.coordinate = {
            core: xy,
            top,
            right,
            bottom,
            left,
          };
        }
      });
    },

    // 添加线
    addLineXY(info: Array<CoordinateInfo>, fatherId: string, sonId: string) {
      // console.log(info);

      this.data.forEach((item) => {
        // 给父级添加线的信息
        if (item.id === fatherId) {
          item.son.push(sonId);
        }
        // 给子级添加父级的id
        if (item.id === sonId) {
          item.father.push(fatherId);
        }
      });

      // 添加线
      let obj = {
        fatherId,
        sonId,
        start: info[0],
        end: info[1],
        id: +new Date() + "",
        color: "#000",
      };
      this.line.push(obj);
    },

    // 更新线的坐标点
    updataLineXY(dataId: string) {
      const dataIndex = this.data.findIndex((item) => item.id === dataId);
      const data = this.data[dataIndex];
      const coordinate = data.coordinate;
      // console.log(coordinate);

      this.line.forEach((item) => {
        if (item.fatherId === dataId) {
          item.start.xy = coordinate[item.start.type];
        } else if (item.sonId === dataId) {
          item.end.xy = coordinate[item.end.type];
        }
      });
    },
  },
});
