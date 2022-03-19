// depthFirstSearch深度优先算法

// 初始化各个顶点状态
const initializeVertexState = (vertices) => {
  let vertexState = {};
  for (let i = 0; i < vertices.length; i++) {
    vertexState[vertices[i]] = 0;
  }
  return vertexState;
};

export let depthFirstSearch = (graph, callback) => {
  let vertices = graph.getVertices(); //获取所有顶点
  let adjList = graph.getAdjList(); //各个顶点的相邻顶点列表（是一个字典）
  let vertexState = initializeVertexState(vertices);

  for (let i = 0; i < vertices.length; i++) {
    const element = vertices[i];
    if (vertexState[element] === 0) {
      depthFirstSearchVisit(element, vertexState, adjList, callback);
    }
  }
};

let depthFirstSearchVisit = (u, vertexState, adjList, callback) => {
  vertexState[u] = 1;
  let neighbors = adjList.get(u);
  for (let i = 0; i < neighbors.length; i++) {
    const w = neighbors[i];
    if (vertexState[w] === 0) {
      depthFirstSearchVisit(w, vertexState, adjList, callback);
    }
  }
  vertexState[u] = 2;
  if (callback) {
    callback(u);
  }
};

export let DFS = (graph) => {
  let vertices = graph.getVertices(); //获取所有顶点
  let adjList = graph.getAdjList(); //各个顶点的相邻顶点列表（是一个字典）
  let vertexState = initializeVertexState(vertices);
  let d = {}; //各个节点的发现时间
  let f = {}; //各个节点的探索完成时间
  let p = {}; //前溯点
  let time = {
    count: 0,
  };

  for (let i = 0; i < vertices.length; i++) {
    // 初始化
    d[vertices[i]] = 0;
    f[vertices[i]] = 0;
    p[vertices[i]] = null;
  }
  for (let i = 0; i < vertices.length; i++) {
    if (vertexState[vertices[i]] === 0) {
      DFSVisit(vertices[i], vertexState, d, f, p, time,adjList);
    }
  }
  return {
      discovery:d,
      finished:f,
      predecessors:p
  }
};
let DFSVisit = (u, vertexState, d, f, p, time,adjList) => {
  d[u] = ++time.count;
  vertexState[u] = 1;
  let neighbors = adjList.get(u);
  for (let i = 0; i < neighbors.length; i++) {
    const w = neighbors[i];
    if (vertexState[w] === 0) {
      p[w] = u;
      DFSVisit(w, vertexState, d, f, p, time,adjList);
    }
  }
  vertexState[u] = 2;
  f[u] = ++time.count;
};
