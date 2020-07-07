const groupMatch = (group, recipe) => {
  switch(group) {
    case 'OWN':
      return false;
    case 'FAVORITES':
      return false;
    default:
      return true;
  }
}

export default (recipes, { text, group }) => {
  return recipes.filter((recipe) => {
    const textMatch =
      recipe.title.toLowerCase().includes(text.toLowerCase()) ||
      recipe.author.display_name.toLowerCase().includes(text.toLowerCase())
    
    return textMatch && groupMatch(group, recipe);
  });
}
