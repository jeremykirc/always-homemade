module ApplicationHelper
  def image_grid_data
    [
      {
        title: 'Pacific Ocean',
        description: 'A big blue ocean',
        url: asset_pack_path('media/images/Ocean.jpg')
      },
      {
        title: 'Santa Barbara Mission',
        description: 'The mission on a sunny afternoon',
        url: asset_pack_path('media/images/SbMission.jpg')
      }
    ]
  end
end
