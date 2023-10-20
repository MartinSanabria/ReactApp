<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;
use App\Http\Controllers\Service;

class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $clients = Client::all();
        $array = [];
        foreach ($clients as $client){
            $array[] = [
                'id' => $client->id,
                'nombre' => $client->nombre,
                'apellido' => $client->apellido,
                'email' => $client->email,
                'telefono' => $client->telefono,
                'direccion' => $client->direccion,
            ];
            
        }
        return response()->json($array);

    }




    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request -> validate([
            'nombre' => 'required|string',
            'apellido' => 'required|string',
            'email' => 'required|string',
            'telefono' => 'required|string',
            'direccion' => 'required|string'
        ]);
        $client = new Client;
        $client -> nombre = $request->nombre;
        $client -> apellido = $request->apellido;
        $client -> email = $request -> email;
        $client -> telefono = $request -> telefono;
        $client -> direccion = $request -> direccion;

        $existingUserEmail = Client::where('email', $request->email)->first();
            if ($existingUserEmail) {
                $data = [
                    'message' => 'El correo ya esta registrado.'
                ];
            } else{
                $client -> save();
                $data = [
                    'message' => 'Cliente registrado satisfactoriamente'
                ];
            }
        
        return response()->json($data);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $client = Client::find($id);
    
        if (!$client) {
            $data = [
                'message' => 'Cliente no encontrado'
            ];
            return response()->json($data, 404);
        }
    
        $services = $client->services()
                        ->distinct()
                        ->select('services.id', 'services.nombre', 'services.descripcion', 'services.precio')
                        ->get();
    
        $result = [
            'services' => $services
        ];
    
        return response()->json($result);
    }
    


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id )
    {
        $client = Client::find($id);

        if (!$client) {
            $data = [
                'message' => 'Cliente no encontrado'
            ];
        } else {
            $client -> nombre = $request->nombre;
            $client -> apellido = $request->apellido;
            $client -> email = $request -> email;
            $client -> telefono = $request -> telefono;
            $client -> direccion = $request -> direccion;
            $client -> save();
    
            $data = [
                'message' => 'Cliente actualizado satisfactoriamente'
            ];
        }
        
        return response()->json($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $client = Client::find($id);

        if (!$client) {
            $data = [
                'message' => 'Cliente no encontrado'
            ];
        } else {
            $client ->delete();
            $data = [
                'message' => 'Cliente borrado satisfactoriamente'
            ];
            return response()->json($data);
        }
       
    }


    public function attach(Request $request)
    {
        // Obtén el cliente por su ID
        $client = Client::find($request->client_id);
    
        // Verifica si el cliente existe
        if (!$client) {
            // Manejo de error: Cliente no encontrado
            return response()->json(['error' => 'Cliente no encontrado'], 404);
        }
    
        // Intenta adjuntar el servicio al cliente
        try {
            $client->services()->attach($request->service_id);
        } catch (\Exception $e) {
            // Manejo de error: Error al adjuntar el servicio
            return response()->json(['error' => 'Error al adjuntar el servicio'], 500);
        }
    
        // Si llegamos aquí, la operación fue exitosa
        $data = [
            'message' => 'Servicio contratado satisfactoriamente'
        ];
    
        return response()->json($data);
    }

    public function detach(Request $request){
        // Obtén el cliente por su ID
        $client = Client::find($request->client_id);
    
        // Verifica si el cliente existe
        if (!$client) {
            // Manejo de error: Cliente no encontrado
            return response()->json(['error' => 'Cliente no encontrado'], 404);
        }
    
        // Intenta adjuntar el servicio al cliente
        try {
            $client->services()->detach($request->service_id);
        } catch (\Exception $e) {
            // Manejo de error: Error al adjuntar el servicio
            return response()->json(['error' => 'Error al cancelar el servicio', $e-> getMessage()], 500);
        }
    
        // Si llegamos aquí, la operación fue exitosa
        $data = [
            'message' => 'Servicio cancelado satisfactoriamente'
        ];
    
        return response()->json($data);
    }
    
}
