@extends('layouts.app')

@section('content')
    <div class="container">
        <table id="rezervacije-table" class="table table-bordered table-striped">
            <thead>
                <tr>
                    <th width="10%">Id rezervacije</th>
                    <th width="15%">Datum od</th>
                    <th width="15%">Datum do</th>
                    <th width="40%">Ime</th>
                    <th width="20%">Akcije</th>
                </tr>
            </thead>
        </table>
    </div>

    <script>
        $(document).ready(function() {
            $('#rezervacije-table').dataTable({
                processing: true,
                serverSide: true,
                ajax: {
                    url: "http://127.0.0.1:8000/api/rezervacije"
                },
                columns: [{
                        data: 'id_rezervacija',
                        name: 'id_rezervacija'
                    },
                    {
                        data: 'datum_od',
                        name: 'datum_od'
                    },
                    {
                        data: 'datum_do',
                        name: 'datum_do'
                    },
                    {
                        data: 'name',
                        name: 'name'
                    },
                    {
                        data: 'id_rezervacija',
                        name: 'id_rezervacija',
                        render: function(data) {
                            return `<button type="button" name="" id="${data}" class="del btn btn-danger btn-lg btn-block">
                                    Obrisi
                                </button>`
                        }
                    }
                ]
            })
        });

        $('body').on('click', '.del', function(e) {
            const id = $(this).attr('id');
            $.ajax({
                type: "POST",
                url: "http://127.0.0.1:8000/api/rezervacije/" + id,
                data: {
                    _method: 'DELETE'
                },
                success: function(response) {
                    alert(response.poruka)
                }
            });
        });
    </script>
@endsection
