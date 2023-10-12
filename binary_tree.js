class UserNode {
    constructor(usuario) {
        this.usuario = usuario;
        this.left = null;
        this.right = null;
    }
}

class UserBinarySearchTree {
    constructor() {
        this.root = null;
    }

    insert(usuario) {
        if (!usuario || !usuario.id) {
            throw new Error("El usuario debe tener un ID.");
        }
        if (usuario.usuario.length > 10 || usuario.password.length > 8) {
            throw new Error("El usuario o la contraseña exceden la longitud permitida.");
        }
        const newNode = new UserNode(usuario);
        if (this.root === null) {
            this.root = newNode;
        } else {
            this.insertNode(this.root, newNode);
        }
    }

    insertNode(node, newNode) {
        if (newNode.usuario.id < node.usuario.id) {
            if (node.left === null) {
                node.left = newNode;
            } else {
                this.insertNode(node.left, newNode);
            }
        } else if (newNode.usuario.id > node.usuario.id) {
            if (node.right === null) {
                node.right = newNode;
            } else {
                this.insertNode(node.right, newNode);
            }
        }
        // Ignore if the ID is already in the tree (no duplicates allowed).
    }

    remove(id) {
        if (id === null || id === undefined) {
            throw new Error("ID no válido.");
        }
        this.root = this.removeNode(this.root, id);
    }

    removeNode(node, id) {
        if (node === null) {
            return null;
        }
        if (id < node.usuario.id) {
            node.left = this.removeNode(node.left, id);
            return node;
        } else if (id > node.usuario.id) {
            node.right = this.removeNode(node.right, id);
            return node;
        } else {
            if (node.left === null && node.right === null) {
                node = null;
                return node;
            }
            if (node.left === null) {
                node = node.right;
                return node;
            }
            if (node.right === null) {
                node = node.left;
                return node;
            }
            const aux = this.findMinNode(node.right);
            node.usuario = aux.usuario;
            node.right = this.removeNode(node.right, aux.usuario.id);
            return node;
        }
    }

    findMinNode(node) {
        if (node.left === null) {
            return node;
        } else {
            return this.findMinNode(node.left);
        }
    }

    search(id) {
        return this.searchNode(this.root, id);
    }

    searchNode(node, id) {
        if (node === null) {
            return null;
        } else if (id < node.usuario.id) {
            return this.searchNode(node.left, id);
        } else if (id > node.usuario.id) {
            return this.searchNode(node.right, id);
        } else {
            return node.usuario;
        }
    }

    update(id, newUser) {
        const existingUser = this.search(id);
        if (existingUser) {
            if (newUser.usuario.length > 10 || newUser.password.length > 8) {
                throw new Error("El usuario o la contraseña exceden la longitud permitida.");
            }
            existingUser.usuario = newUser.usuario;
            existingUser.password = newUser.password;
            existingUser.nombre = newUser.nombre;
            existingUser.apellidos = newUser.apellidos;
        }
    }
    displayUsers() {
        const users = [];
        this.inOrderTraversal(this.root, (node) => {
            users.push(node.usuario);
        });
        return users;
    }

    inOrderTraversal(node, callback) {
        if (node !== null) {
            this.inOrderTraversal(node.left, callback);
            callback(node);
            this.inOrderTraversal(node.right, callback);
        }
    }
}


// Crear un árbol de usuarios
const user_tree = new UserBinarySearchTree();

// Insertar usuarios en el árbol
user_tree.insert({
    id: 1,
    usuario: "user1",
    password: "pass1",
    nombre: "John",
    apellidos: "Doe"
});

user_tree.insert({
    id: 2,
    usuario: "user2",
    password: "pass2",
    nombre: "Jane",
    apellidos: "Smith"
});

user_tree.insert({
    id: 3,
    usuario: "user3",
    password: "pass3",
    nombre: "fer",
    apellidos: "luna"
});

// Buscar un usuario por ID
const user = user_tree.search(1);
console.log("Usuario encontrado por ID 1:", user);

// Actualizar un usuario por ID
user_tree.update(1, {
    usuario: "newuser1",
    password: "newpass1",
    nombre: "Updated John",
    apellidos: "Doe"
});

const updatedUser = user_tree.search(1);
console.log("Usuario actualizado por ID 1:", updatedUser);

// Eliminar un usuario por ID
user_tree.remove(2);

// Intentar buscar un usuario eliminado
const deletedUser = user_tree.search(2);
console.log("Usuario eliminado por ID 2:", deletedUser);

const usersRegistered = user_tree.displayUsers();
console.log("Usuarios registrados:", usersRegistered);