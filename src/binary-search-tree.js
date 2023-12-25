const { NotImplementedError } = require('../extensions/index.js');

 const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/

class BinarySearchTree {

  constructor() {
    this._root = null;
  }

  root() {
    return this._root;
  }

  add(data) {
    const newNode = new Node(data);

        if (this._root === null) {
            this._root = newNode;
        } else {
            this._insertNode(this._root, newNode);
        }
  }

  _insertNode(node, newNode) {
    if (newNode.data < node.data) {
        if (node.left === null) {
            node.left = newNode;
        } else {
            this._insertNode(node.left, newNode);
        }
    } else {
        if (node.right === null) {
            node.right = newNode;
        } else {
            this._insertNode(node.right, newNode);
        }
    }
}

  has( data ) {
    return this._hasNode(this._root, data);
  }

  _hasNode(node, data) {
    if (node === null) {
        return false;
    }

    if (data < node.data) {
        return this._hasNode(node.left, data);
    } else if (data > node.data) {
        return this._hasNode(node.right, data);
    } else {
        return true;
    }
}

  find( data ) {
    return this._findNode(this._root, data);
  }

  _findNode(node, data) {
    if (node === null) {
        return null;
    }

    if (data < node.data) {
        return this._findNode(node.left, data);
    } else if (data > node.data) {
        return this._findNode(node.right, data);
    } else {
        return node;
    }
 }

  remove( data ) {
    this._root = this._removeNode(this._root, data);
  }

  _removeNode(node, data) {
    if (node === null) {
        return null;
    }

    if (data < node.data) {
        node.left = this._removeNode(node.left, data);
    } else if (data > node.data) {
        node.right = this._removeNode(node.right, data);
    } else {
        // Node with the data found, perform removal
        if (node.left === null && node.right === null) {
            // Case 1: Node has no children
            node = null;
        } else if (node.left === null) {
            // Case 2: Node has only right child
            node = node.right;
        } else if (node.right === null) {
            // Case 3: Node has only left child
            node = node.left;
        } else {
            // Case 4: Node has both left and right children
            const minRightNode = this._findMinNode(node.right);
            node.data = minRightNode.data;
            node.right = this._removeNode(node.right, minRightNode.data);
        }
    }

    return node;
  }

  _findMinNode(node) {
    while (node.left !== null) {
        node = node.left;
    }
    return node;
  }

  min() {
    const minNode = this._findMinNode(this._root);
        return minNode ? minNode.data : null;
  }

  max() {
    const maxNode = this._findMaxNode(this._root);
        return maxNode ? maxNode.data : null;
  }

  _findMaxNode(node) {
    while (node.right !== null) {
        node = node.right;
    }
    return node;
  }
}

module.exports = {
  BinarySearchTree
};