class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let count = 0;
    let ourVampire = this;

    while (ourVampire.creator) {
      count = count + 1;
      ourVampire = ourVampire.creator;
    }
    return count;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    return (this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal);
  }

  /** Tree traversal methods **/

  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {
    if (name === this.name) {
      return this;
    };
    for (let descendant of this.offspring) {
      if(descendant.vampireWithName(name)!== null)
        return descendant.vampireWithName(name);
    }
    return null;
  }

  // Returns the total number of vampires that exist
  get totalDescendents() {
    let numOfDesc = 0;

    for (let num of this.offspring) {
      numOfDesc = numOfDesc + 1
      numOfDesc += num.totalDescendents;
    }
    return numOfDesc;
  }

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    let genXVamps = [];

    if (this.yearConverted >= 1980) {
      genXVamps.push(this);
    }

    for (let descendant of this.offspring) {
      genXVamps = genXVamps.concat(descendant.allMillennialVampires)

    }
    return genXVamps;
  }




  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {

  }
}

module.exports = Vampire;

