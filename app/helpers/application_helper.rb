module ApplicationHelper
  def image_grid_data
    [
      {
        title: 'Pacific Ocean',
        description: 'A big blue ocean',
        url: image_url('Ocean.jpg')
      },
      {
        title: 'Santa Barbara Mission',
        description: 'The mission on a sunny afternoon',
        url: image_url('SbMission.jpg')
      }
    ]
  end
end
