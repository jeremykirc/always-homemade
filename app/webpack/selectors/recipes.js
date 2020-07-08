const groupMatch = (group, recipe, user) => {
  switch(group) {
    case 'OWN':
      return user.id == recipe.author.id;
    case 'FAVORITES':
      return false;
    default:
      return true;
  }
}

export default (recipes, { text, group }, user) => {
  return recipes.filter((recipe) => {
    const textMatch =
      recipe.title.toLowerCase().includes(text.toLowerCase()) ||
      recipe.author.display_name.toLowerCase().includes(text.toLowerCase())
    
    return textMatch && groupMatch(group, recipe, user);
  });
}
