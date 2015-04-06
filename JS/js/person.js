function Person (culture_x, culture_y, world_x,world_y) {
    this.culture_x = culture_x;
    this.culture_y = culture_y;

    this.world_x = world_x;
    this.world_y = world_y;
    
    this.geometry = new THREE.BoxGeometry( 10, 10, 20 );
	this.mesh = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
	this.cube = new THREE.Mesh( geometry, mesh );
}